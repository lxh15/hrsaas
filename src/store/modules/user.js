import { login } from '@/api/user'
export default {
  namespaced: true,
  state: {
    token: ''
  },
  mutations: {
    // 设置token
    setToken(state, payload) {
      state.token = payload
    }
  },
  actions: {
    // 获取token
    async getToken(context, payload) {
      const res = await login(payload)
      console.log(res)
      context.commit('setToken', res)
    }
  }
}
