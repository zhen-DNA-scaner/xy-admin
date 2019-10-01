/*
** @description 全局指令
*/


export const directive = {
  permission: () => import('./permission'),
};

export default Vue => {
  for(let k in directive){
    Vue.directive(k, directive[k]);
  }
}
