/**
 * @param {string} url
 * @returns {Object}
 */
export function getQueryObject(url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

/**
 * @description 获取今日、本周、本月或本年的开始时间和结束时间
 * @param   {string} type   today week month year
 * @param   {function} callback
 * @returns {Object}
 */
export function getCurrentDateRange({type = 'today', callback = ()=>{}} = {}){
  const now = new Date();
  const today = now.toLocaleDateString().replace(/\//g, '-');
  let dateRange = {
    startDate: today,
    endDate: today
  };

  if (type !== 'today') {
    switch (type) {
      case 'week':
        var day = now.getDay();
        var DAYSTAMP = 24 * 60 * 60 * 1000;
        DAYSTAMP = DAYSTAMP * ( day ? day : 7 );
        dateRange = {
          startDate: new Date(now.getTime() - DAYSTAMP).toLocaleDateString().replace(/\//g, '-'),
          endDate: today
        };
        break;

      case 'month':
        var startDate = today.split('-');
        startDate[2] = 1;
        startDate = startDate.join('-');
        dateRange = {
          startDate,
          endDate: today
        };
        break;
    
      default:
        startDate = today.split('-');
        startDate[1] = 1;
        startDate = startDate.join('-');
        dateRange = {
          startDate,
          endDate: today
        };
        break;
    }
  }

  callback(dateRange)
  return dateRange;
}