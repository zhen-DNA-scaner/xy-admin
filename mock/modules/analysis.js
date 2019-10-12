import { getQueryObject } from '@/utils/index.js';

const chartDataTemp = ({ url, Random }) => {
  let { startDate, endDate} = getQueryObject(url);

  if(!startDate || !endDate) return {
    code: 40022
  }

  // 时间标签
  let labels = [];
  const startDateArr = startDate.split(/[/-]/).map(v => +v);
  const endDateArr = endDate.split(/[/-]/).map(v => +v);

  if (endDate == startDate) {
    for(let i=0; i<24; i++){
      labels.push(`${i}时`);
    }
  } else if (startDateArr[2] != endDateArr[2]) {
    for(let i=startDateArr[2]; i<=endDateArr[2]; i++){
      labels.push(`${i}日`);
    }
  } else {
    for(let i=startDateArr[1]; i<=endDateArr[1]; i++){
      labels.push(`${i}月`);
    }
  }
  return {
    code: 20000,
    data: {
      labels,
      data: Array.from(new Array(labels.length)).map(() => Random.integer(1, 12)),
      rank: [{
        name: '工专路 0 号店',
        volume: 635645
      },{
        name: '工专路 0 号店',
        volume: 363729
      },{
        name: '工专路 0 号店',
        volume: 323332
      },{
        name: '工专路 0 号店',
        volume: 209193
      },{
        name: '工专路 0 号店',
        volume: 259384
      },{
        name: '工专路 0 号店',
        volume: 139828
      },{
        name: '工专路 0 号店',
        volume: 32333
      }]
    }
  }
};

export default [{
  url: '/api/analysis',
  type: 'get',
  response: () => {
    return {
      code: 20000,
      data: {
        sales: {
          count: 126560,
          trendWeekly: 0.12,
          trendDaily: -0.11,
          countDaily: 12432,
          descriptions: '销售额稳步上升'
        },
        pv: {
          count: 8846,
          data: [{
            labels: ['2019-10-04','2019-10-05','2019-10-06','2019-10-07','2019-10-08','2019-10-09','2019-10-10','2019-10-10','2019-10-10','2019-10-10','2019-10-10','2019-10-10','2019-10-10','2019-10-10','2019-10-10','2019-10-10','2019-10-10'],
            datasets: [{
              data: [7,5,4,2,4,7,5,6,5,9,6,3,1,5,3,6,5]
            }]
          }],
          countDaily: 1234,
          descriptions: '暂无指标说明'
        },
        order: {
          count: 6560,
          data: [{
            labels: ['2019-10-04','2019-10-05','2019-10-06','2019-10-07','2019-10-08','2019-10-09','2019-10-10','2019-10-10','2019-10-10','2019-10-10','2019-10-10','2019-10-10','2019-10-10','2019-10-10','2019-10-10','2019-10-10','2019-10-10'],
            datasets: [{
              data: [7,5,4,2,4,7,5,6,5,9,6,3,1,5,3,6,5]
            }]
          }],
          paiedRate: 0.6,
          descriptions: '暂无指标说明'
        },
        operation: {
          score: 0.85,
          trendWeekly: 0.12,
          trendDaily: -0.11,
          descriptions: '运营良好'
        }
      }
    }
  }
},{
  url: /\/api\/sales.*/,
  type: 'get',
  response: chartDataTemp
},{
  url: /\/api\/pv.*/,
  type: 'get',
  response: chartDataTemp
}]