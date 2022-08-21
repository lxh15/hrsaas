import Layout from '@/layout'
export default {
  path: '/attendances',
  component: Layout,
  meta: { id: 'attendances' }, // 用来和后端返回的权限匹配动态的路由
  children: [
    {
      path: '',
      component: () => import('@/views/attendances'),
      meta: { title: '考勤', icon: 'skill' }
    }
  ]
}
