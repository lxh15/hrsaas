import router, { constantRoutes, asyncRoutes } from '@/router'
export default {
  namespaced: true,
  state: {
    routes: [] // 自己维护的静态路由 + 动态路由
  },
  mutations: {
    setRoutes(state, routes) {
      state.routes = [...constantRoutes, ...routes]
    }
  },
  actions: {
    fliterRoutes(context, roles) {
      const routes = asyncRoutes.filter((item) => {
        // 如果权限标识在roles.menus ， 有这个权限  不在则没有权限
        return roles.menus.includes(item.meta.id)
      })
      context.commit('setRoutes', routes)
      //   console.log(routes)
      // vue提供了动态路由添加的方法
      router.addRoutes([
        ...routes,
        { path: '*', redirect: '/404', hidden: true }
      ])
    }
  },
  getters: {}
}
