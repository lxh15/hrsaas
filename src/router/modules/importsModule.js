import Layout from '@/layout'
export default {
  path: '/importsModule',
  component: Layout,
  // hidden: true,
  children: [
    {
      path: '',
      component: () => import('@/views/importsModule'),
      meta: { title: '导入', icon: 'tree-table' }
    }
  ]
}
