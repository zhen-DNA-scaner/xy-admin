<template>
  <a-card class="analysis-category-wraper" title="销售类别占比" :bordered=false>
    <div slot="extra">
      <a-radio-group v-model="current" @change="change">
        <a-radio-button value="all">全部渠道</a-radio-button>
        <a-radio-button value="online">线上</a-radio-button>
        <a-radio-button value="offline">门店</a-radio-button>
      </a-radio-group>
      <a-dropdown :trigger="['click']">
        <a-icon class="more-ctrl" type="ellipsis" />
        <a-menu slot="overlay">
          <a-menu-item>操作一</a-menu-item>
          <a-menu-item>操作二</a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
    <div class="pie-wraper">
      <h4>销售额</h4>
      <div v-show="current === 'all'">
        <a-row type="flex" class="chart-wraper">
          <a-col :span="12">
            <canvas ref="allCategoryChart" height="270"></canvas>
            <div class="canvas-txt">
              <label>销售额</label>
              <div>￥{{ 15213 | formatNumber }}</div>
            </div>
          </a-col>
          <a-col :span="12">
            <ul>
              <li v-for="item in formatData" :key="item.label">
                <span class="dot" :style="{backgroundColor: item.backgroundColor}"></span>
                {{item.label}}
                <span class="percent">{{item.percent}}</span>
                ￥{{item.salesVolume}}
              </li>
            </ul>
          </a-col>
        </a-row>
      </div>
      <div v-show="current === 'online'">
        online
      </div>
      <div v-show="current === 'offline'">
        offline
      </div>
    </div>
  </a-card>
</template>

<script>
const options = {
  cutoutPercentage: 70,
  legend: {
    display: false
  },
};

const data = {
  labels: ['家用电器','食用酒水','个护健康','服饰箱包','母婴产品','其他'],
  datasets: [{
    data: [4544, 3321, 3113, 2341, 1231, 1231],
    backgroundColor: ['rgb(24, 144, 255)', 'rgb(19, 194, 194)', 'rgb(47, 194, 91)', 'rgb(250, 204, 20)', 'rgb(240, 72, 100)', 'rgb(133, 67, 224)'],
    borderWidth: 5,
    borderColor: '#fff',
    hoverBorderWidth: 5,
    hoverBorderColor: '#fff',
    hoverBackgroundColor: ['rgba(24, 144, 255, 0.8)', 'rgba(19, 194, 194, 0.8)', 'rgba(47, 194, 91, 0.8)', 'rgba(250, 204, 20, 0.8)', 'rgba(240, 72, 100, 0.8)', 'rgba(133, 67, 224, 0.8)']
  }]
};

import Chart from 'chart.js';
export default {
  mounted(){
    this.setAllCategoryChart();
  },
  data(){
    return{
      current: 'all',
      chartData: data,
    }
  },
  computed: {
    formatData(){
      const count = this.chartData.labels.length;
      let data = [];
      for(let i = 0; i < count; i++){
        const salesVolume = this.chartData.datasets[0].data[i];
        data.push({
          backgroundColor: this.chartData.datasets[0].backgroundColor[i],
          label: this.chartData.labels[i],
          salesVolume,
          percent: `${ Math.ceil( salesVolume / this.salesCount * 10000 ) / 100 }%`
        })
      }
      return data;
    },
    salesCount(){
      return this.chartData.datasets[0].data.reduce((n, m) => n+m);
    }
  },
  methods: {
    change(){},
    setAllCategoryChart(){
      const ctx = this.$refs.allCategoryChart;
      var chart = new Chart(ctx, {
        type: 'doughnut',
        data,
        options
      });
      chart.generateLegend();
    }
  }
}
</script>

<style lang="scss">
  .analysis-category-wraper{
    height: 100%;
    .more-ctrl{
      cursor: pointer;
      margin-left: 20px;
    }
    .ant-card-extra{
      padding: 12px 0;
    }
    .pie-wraper{
      margin: 0 0 30px 0;
    }
    .chart-wraper{
      margin: 40px 0;
      position: relative;
      align-items: center;
      ul{
        padding: 0 0 0 20px;
        list-style: none;
      }
      li{
        display: flex;
        align-items: center;
        margin: 10px 0;
      }
      .dot{
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        margin-right: 10px;
      }
      .percent{
        color: #999;
        margin: 0 10px;
        border-left: solid 1px #ddd;
        display: inline-block;
        padding-left: 10px;
        line-height: 1;
      }
    }
    .canvas-txt{
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-content: center;
      justify-content: center;
      text-align: center;
      flex-wrap: wrap;
      pointer-events: none;
      label{
        display: block;
        width: 100%;
      }
      div{
        font-size: 2em;
      }
    }
  }
</style>