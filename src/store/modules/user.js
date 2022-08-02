import { getUserInfoApi, login, getUserDetail } from '@/api/user'
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
    },
    // 获取用户信息
    async getUserInfo(context) {
      // console.log(context)

      const userBase = await getUserInfoApi()
      const userInfo = await getUserDetail(userBase.userId)
      console.log(userBase)
      console.log(userInfo)
      context.commit('setUserInfo', { ...userBase, ...userInfo })

      // setTimeout(() => {
      //   const res = { name: '张三' }
      // }, 1000)
    }
  }
}
