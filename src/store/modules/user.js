import { getUserInfoApi, login, getUserDetail } from '@/api/user'
import { setTokenTime } from '@/utils/auth'
import { resetRouter } from '@/router'
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
      // actions 内部可以通过return 将数据传递出去  类似 then中得return
      return userBase
    },
    // 退出 清除token  清除信息
    logout(context) {
      context.commit('setToken', '')
      context.commit('setUserInfo', '')
      resetRouter() // 赋值
      // 重置vuex
      // {root : true} // 可以使commit 变成全局的 commit 可以随意调用任何模块的
      context.commit('permission/setRoutes', [], { root: true })
    }
  }
}
