export default [{
  path: '/error/403',
  name: 'error403',
  component: () => import('@/views/error/403.vue')
},{
  path: '/error/404',
  name: 'error404',
  component: () => import('@/views/error/404.vue')
},{
  path: '/error/500',
  name: 'error500',
  component: () => import('@/views/error/500.vue')
}]