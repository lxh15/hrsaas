import { getUserInfoApi, login, getUserDetail } from '@/api/user'
import { setTokenTime } from '@/utils/auth'
export default {
  namespaced: true,
  state: {
    token: '',
    userInfo: {}
  },
  mutations: {
    // 设置token
    setToken(state, payload) {
      state.token = payload
    },
    setUserInfo(state, payload) {
      state.userInfo = payload
    }
  },
  actions: {
    // 获取token
    async getToken(context, payload) {
      const res = await login(payload)
      // console.log(res)
      context.commit('setToken', res)
      setTokenTime() //获取时间戳
    },
    // 获取用户信息
    async getUserInfo(context) {
      const userBase = await getUserInfoApi()
      const userInfo = await getUserDetail(userBase.userId)
      // console.log(userBase)
      // console.log(userInfo)
      context.commit('setUserInfo', { ...userBase, ...userInfo })
    },
    // 退出 清除token  清除信息
    logout(context) {
      context.commit('setToken', '')
      context.commit('setUserInfo', '')
    }
  }
}
