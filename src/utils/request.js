// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getTokenTime } from '@/utils/auth'
import router from '@/router'
const service = axios.create({
  // 如果执行 npm run dev  值为 /api 正确  /api 这个代理只是给开发环境配置的代理
  // 如果执行 npm run build 值为 /prod-api  没关系  运维应该在上线的时候 给你配置上 /prod-api的代理
  baseURL: process.env.VUE_APP_BASE_API // 设置axios请求的基础的基础地址
  // timeout: 5000
}) // 创建一个axios的实例
// 请求拦截器
service.interceptors.request.use((config) => {
  // 在这个位置需要统一的去注入token
  if (store.state.user.token) {
    const currentTime = Date.now()
    const tokenTime = getTokenTime()
    const tokenTimeout = 2 * 60 * 60 * 1000
    if (currentTime - tokenTime > tokenTimeout) {
      // console.log('token过期')
      store.dispatch('user/logout')
      router.push('/login')
      return Promise.reject(new Error('登陆过期'))
    } else {
      // 如果token存在 注入token
      config.headers['Authorization'] = `Bearer ${store.state.user.token}`
    }
  }
  return config // 必须返回配置
})
// 响应拦截器
service.interceptors.response.use(
  // 成功做点什么
  (res) => {
    // console.log(res)
    const { data, success, message } = res.data
    if (success) {
      return data
    }
    Message.error(message)
    return Promise.reject(new Error(message))
  },
  // 失败做点什么
  (error) => {
    if (error?.response?.status === 401) {
      Message.error('登陆过期')
      store.dispatch('user/logout')
      router.push('/login')
    } else {
      Message.error(error.message)
    }
    return Promise.reject(error)
  }
)
export default service // 导出axios实例
