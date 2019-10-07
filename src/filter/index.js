import { formatNumber } from './modules/format';

export const filter = {
  formatNumber,
};

export default Vue => {
  for(let k in filter){
    Vue.filter(k, filter[k]);
  }
}
