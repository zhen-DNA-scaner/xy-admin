/*
** @description 全局组件
*/

export const components = {
  layout: () => import('@/views/layout/index.vue'),
  dropdown: () => import('./dropdown/index.vue'),
  loading: () => import('./feedback/loading/index.vue'),
  'message-none': () => import('./icons/message-none.vue'),
};

export default Vue => {
  for(let k in components){
    Vue.component(k, components[k]);
  }
}