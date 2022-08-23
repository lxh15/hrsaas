import Layout from '@/layout'
export default {
  path: '/importsModule',
  component: Layout,
  // hidden: true,
  meta: { id: 'importsModule' }, // 用来和后端返回的权限匹配动态的路由

  children: [
    {
      path: '',
      name: 'importsModule',
      component: () => import('@/views/importsModule'),
      meta: { title: '导入', icon: 'tree-table' }
    }
  ]
}
