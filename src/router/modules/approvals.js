import Layout from '@/layout'
export default {
  path: '/approvals',
  component: Layout,
  meta: { id: 'approvals' }, // 用来和后端返回的权限匹配动态的路由
  children: [
    {
      path: '',
      component: () => import('@/views/approvals'),
      meta: { title: '审批', icon: 'tree-table' }
    }
  ]
}
