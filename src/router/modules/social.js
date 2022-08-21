import Layout from '@/layout'
export default {
  path: '/social',
  component: Layout,
  meta: { id: 'social_securitys' }, // 用来和后端返回的权限匹配动态的路由
  children: [
    {
      path: '',
      component: () => import('@/views/social'),
      meta: { title: '社保', icon: 'table' }
    }
  ]
}
