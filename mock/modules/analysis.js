import { getQueryObject } from '@/utils/index.js';

const salesAndPV = [{
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
}];

const initDataLabels = ({ url }) => {
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

  // for(let i = 0; i < datasetCount; i++){
  //   data.push(Array.from(new Array(labels.length)).map((v, i) => Random.integer(1, 12) + i))
  // }
  
  return labels;
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
  response: (ctx) => {
    const labels = initDataLabels(ctx);
    const { Random } = ctx;
    if(labels.code) return labels;
    return {
      code: 20000,
      data: {
        labels,
        data: Array.from(new Array(labels.length)).map((v, i) => Random.integer(1, 12) + i),
        rank: salesAndPV
      }
    }
  }
},{
  url: /\/api\/pv.*/,
  type: 'get',
  response: (ctx) => {
    const labels = initDataLabels(ctx);
    const { Random } = ctx;
    if(labels.code) return labels;
    return {
      code: 20000,
      data: {
        labels,
        data: Array.from(new Array(labels.length)).map((v, i) => Random.integer(1, 12) + i),
        rank: salesAndPV
      }
    }
  }
},{
  url: /\/api\/analysis\/search/,
  type: 'get',
  response: ({ url }) => {
    const { key, sort } = getQueryObject(url);
    let list = [{
      key: '搜索关键词-0',
      rank: 1,
      userCount: 980,
      weekTrend: -0.4
    },{
      key: '搜索关键词-1',
      rank: 2,
      userCount: 861,
      weekTrend: 5.5
    },{
      key: '搜索关键词-2',
      rank: 3,
      userCount: 579,
      weekTrend: 2.8
    },{
      key: '搜索关键词-3',
      rank: 4,
      userCount: 511,
      weekTrend: 0.5
    },{
      key: '搜索关键词-4',
      rank: 5,
      userCount: 561,
      weekTrend: -0.78
    }];

    if(key && sort)
      list = list.sort((a, b) => sort === 'asc' ? b[key] - a[key] : a[key] - b[key]);

    return {
      code: 20000,
      data: {
        usersSearch: {
          count: 12321,
          trend: 0.12,
          datasets: {
            labels: ['2019-10-7', '2019-10-8', '2019-10-9', '2019-10-10', '2019-10-11', '2019-10-11', '2019-10-12', '2019-10-13'],
            data: [1,6,4,8,3,7,2]
          }
        },
        average: {
          count: 2.7,
          trend: -0.024,
          datasets: {
            labels: ['2019-10-7', '2019-10-8', '2019-10-9', '2019-10-10', '2019-10-11', '2019-10-11', '2019-10-12', '2019-10-13'],
            data: [1,3,4,6,3,7,2]
          }
        },
        list
      }
    }
  }
},{
  url: /\/api\/analysis\/salescategory/,
  type: 'get',
  response: ({ Random }) => {
    return {
      code: 20000,
      data: [{
        _id: Random.id(),
        category: {
          _id: Random.id(),
          name: '家用电器'
        },
        sales: 4544
      },{
        _id: Random.id(),
        category: {
          _id: Random.id(),
          name: '食用酒水'
        },
        sales: 3321
      },{
        _id: Random.id(),
        category: {
          _id: Random.id(),
          name: '个护健康'
        },
        sales: 3113
      },{
        _id: Random.id(),
        category: {
          _id: Random.id(),
          name: '服饰箱包'
        },
        sales: 2341
      },{
        _id: Random.id(),
        category: {
          _id: Random.id(),
          name: '母婴产品'
        },
        sales: 1231
      },{
        _id: Random.id(),
        category: {
          _id: Random.id(),
          name: '其他'
        },
        sales: 1211
      }]
    }
  }
},{
  url: /\/api\/analysis\/goods/,
  type: 'get',
  response: ({ Random }) => {
    return {
      code: 20000,
      data: [{
        _id: Random.id(),
        name: 'sotres 1',
        uv: 235,
        paied: 11
      },{
        _id: Random.id(),
        name: 'sotres 2',
        uv: 3321,
        paied: 100
      },{
        _id: Random.id(),
        name: 'sotres 3',
        uv: 755,
        paied: 20
      },{
        _id: Random.id(),
        name: 'sotres 4',
        uv: 12324,
        paied: 121
      },{
        _id: Random.id(),
        name: 'sotres 5',
        uv: 2243,
        paied: 98
      },{
        _id: Random.id(),
        name: 'sotres 6',
        uv: 4204,
        paied: 42
      },{
        _id: Random.id(),
        name: 'sotres 7',
        uv: 755,
        paied: 20
      },{
        _id: Random.id(),
        name: 'sotres 8',
        uv: 12324,
        paied: 121
      },{
        _id: Random.id(),
        name: 'sotres 9',
        uv: 2243,
        paied: 98
      },{
        _id: Random.id(),
        name: 'sotres 10',
        uv: 4204,
        paied: 42
      }]
    }
  }
},{
  url: /\/api\/analysis\/good\/.*/,
  type: 'get',
  response: (ctx) => {
    const labels = initDataLabels( ctx );
    const { Random } = ctx;
    if(labels.code) return labels;
    return {
      code: 20000,
      data: {
        labels,
        datasets: [{
          label: '客流量',
          data: Array.from(new Array(labels.length)).map(() => Random.integer(15, 100))
        },{
          label: '支付笔数',
          data: Array.from(new Array(labels.length)).map(() => Random.integer(200, 500))
        }]
      }
    }
  }
}]