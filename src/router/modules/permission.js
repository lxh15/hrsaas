import Layout from '@/layout'
export default {
  path: '/permission',
  component: Layout,
  meta: { id: 'permissions' }, // 用来和后端返回的权限匹配动态的路由

  children: [
    {
      path: '',
      name: 'permission',
      component: () => import('@/views/permission'),
      meta: { title: '权限管理', icon: 'lock' }
    }
  ]
}
