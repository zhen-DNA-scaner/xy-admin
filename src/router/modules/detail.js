export default [{
  path: '/detail/article',
  name: 'detailArticle',
  component: () => import('@/views/detail/article.vue')
}, {
  path: '/detail/advanced',
  name: 'detailAdvanced',
  component: () => import('@/views/detail/advanced.vue')
}]