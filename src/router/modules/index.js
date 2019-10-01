/*
 * @attribute {roles} Access router permissions, default have all permissions
*/

export default [{
  path: '/',
  name: 'home',
  component: () => import('@/views/index.vue')
},{
  path: '/login',
  name: 'login',
  component: () => import('@/views/login/index.vue')
},{
  path: '/403',
  name: '403',
  component: () => import('@/views/error/403.vue')
},{
  path: '/permission',
  name: 'permission',
  component: () => import('@/views/permission.vue'),
  // the route is not set permission if meta roles is undefined
  meta: [{
    roles: ['admin', 'editor']
  }]
}]