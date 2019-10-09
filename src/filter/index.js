import { formatNumber, formatPercent } from './modules/format';

export const filter = {
  formatNumber,
  formatPercent
};

export default Vue => {
  for(let k in filter){
    Vue.filter(k, filter[k]);
  }
}
