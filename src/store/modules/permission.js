import router, { constantRoutes, asyncRoutes } from '@/router'
export default {
  namespaced: true,
  state: {
    routes: [], // 自己维护的静态路由 + 动态路由
    points: [] // 按钮权限
  },
  mutations: {
    // 设置路由权限
    setRoutes(state, routes) {
      state.routes = [...constantRoutes, ...routes]
    },
    // 设置按钮权限
    setPoints(state, points) {
      state.points = points
    }
  },
  actions: {
    fliterRoutes(context, roles) {
      const routes = asyncRoutes.filter((item) => {
        // 如果权限标识在roles.menus ， 有这个权限  不在则没有权限
        return roles.menus.includes(item.meta.id)
      })
      context.commit('setRoutes', routes) // 路由权限
      context.commit('setPoints', roles.points) // 按钮权限
      //   console.log(routes)
      // vue提供了动态路由添加的方法
      router.addRoutes([
        ...routes,
        { path: '*', redirect: '/404', hidden: true }
      ])
    }
    // setPointsAction(context, points) {
    //   context.commit('setPoints', points)
    // }
  },
  getters: {}
}
