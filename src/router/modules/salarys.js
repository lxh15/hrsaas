import Layout from '@/layout'
export default {
  path: '/salarys',
  component: Layout,
  meta: { id: 'salarys' }, // 用来和后端返回的权限匹配动态的路由

  children: [
    {
      path: '',
      component: () => import('@/views/salarys'),
      meta: { title: '工资', icon: 'money' }
    }
  ]
}
