export default [{
  path: '/result/success',
  name: 'resultSuccess',
  component: () => import('@/views/result/success.vue')
},{
  path: '/result/fail',
  name: 'resultFail',
  component: () => import('@/views/result/fail.vue')
}]