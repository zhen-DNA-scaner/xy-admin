export const formatNumber = num => (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
export const formatPercent = (num, decimal = 2, truncType = "ceil") => {
  let base = 100;
  while(decimal > 0){
    base = base * 10;
    decimal--;
  }
  return `${ Math[truncType]( num * base ) / 100 }%`;
};