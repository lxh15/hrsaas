import Layout from '@/layout'
export default {
  path: '/setting',
  component: Layout,
  meta: { id: 'settings' }, // 用来和后端返回的权限匹配动态的路由
  children: [
    {
      path: '',
      name: 'setting',
      component: () => import('@/views/setting'),
      meta: { title: '公司设置', icon: 'setting' }
    }
  ]
}
