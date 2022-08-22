import router, { asyncRoutes } from '@/router'
import store from '@/store'
// 路由(全局)前置守卫
// 会在所有路由进入之前触发
// to: 去哪里的路由信息
// from: 来自于哪个路由的信息
// next: 是否进入
const list = ['/login', '/404'] //设置白名单
router.beforeEach(async (to, from, next) => {
  //to and from are Route Object,next() must be called to resolve the hook
  // 判断有没有token
  const token = store.state.user.token
  if (token) {
    if (!store.state.user.userInfo.userId) {
      // 获取用户信息  store.dispatch得返回值是promise
      const { roles } = await store.dispatch('user/getUserInfo')
      console.log(roles.points)
      await store.dispatch('permission/fliterRoutes', roles)
      // 传递按钮权限
      // await store.dispatch('permission/setPointsAction', roles.points)
      next(to.path)
    }
    //   有token 在login页面就跳到根路径
    if (to.path === '/login') return next('/')
    next() // 不去login就放行
  } else {
    //   没有token
    const isClude = list.includes(to.path)
    if (isClude) return next() //在白名单中就放行  不需要登录的页面
    next('/login') // 不在白名单中就去登录页
  }
})
