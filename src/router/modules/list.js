export default [{
  path: '/list/query',
  name: 'listQuery',
  component: () => import('@/views/list/query.vue')
}, {
  path: '/list/card',
  name: 'listCard',
  component: () => import('@/views/list/card.vue')
}]