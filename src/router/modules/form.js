export default [{
  path: '/form/base',
  name: 'formBase',
  component: () => import('@/views/form/base.vue')
}, {
  path: '/form/stepbystep',
  name: 'formStepbystep',
  component: () => import('@/views/form/stepbystep.vue')
}, {
  path: '/form/fulltexteditor',
  name: 'fulltexteditor',
  component: () => import('@/views/form/fulltexteditor.vue')
}]