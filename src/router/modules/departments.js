import Layout from '@/layout'
export default {
  path: '/departments',
  component: Layout,
  meta: { id: 'departments' }, // 用来和后端返回的权限匹配动态的路由
  children: [
    {
      path: '',
      name: 'departments',
      component: () => import('@/views/departments'),
      meta: { title: '组织架构', icon: 'tree' }
    }
  ]
}
