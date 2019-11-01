/*
 * @attribute {roles} Access router permissions, default have all permissions
*/
import account from './account';
import error from './error';
import result from './result';
import message from './message';

const index = [{
  path: '/',
  name: 'home',
  component: () => import('@/views/index/index.vue')
},{
  path: '/login',
  name: 'login',
  component: () => import('@/views/login/index.vue'),
  meta: {
    layout: 'none'
  }
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
}];

export default [
  ...index,
  ...account,
  ...error,
  ...result,
  ...message
]