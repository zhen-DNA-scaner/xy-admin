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
      <div v-if="current === 'all'">
        <canvas ref="allCategoryChart"></canvas>
      </div>
      <div v-if="current === 'online'">
        online
      </div>
      <div v-if="current === 'offline'">
        offline
      </div>
    </div>
  </a-card>
</template>

<script>
const options = {
  cutoutPercentage: 70,
  legend: {
    position: 'right'
  },
  legendCallback(chart){
    console.log(chart)
    return `<div>xxxx</div>`;
  }
}

import Chart from 'chart.js';
export default {
  mounted(){
    this.setAllCategoryChart();
  },
  data(){
    return{
      current: 'all'
    }
  },
  methods: {
    change(){},
    setAllCategoryChart(){
      const ctx = this.$refs.allCategoryChart;
      var chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: [
            'RedRedRedRedRedRedRedRedRedRedRedRedR',
            'YellowYellowYellowYellowYellow',
            'BlueBlueBlueBlueBlueBlueBlueBlue'
          ],
          datasets: [{
            data: [10, 20, 30],
            backgroundColor: ['rgba(255,99,132,1)', 'rgba(54,162,235,1)', 'rgba(204,101,254,1)', 'rgba(255,206,86,1)'],
            borderWidth: 5,
            borderColor: '#fff',
            hoverBorderWidth: 5,
            hoverBorderColor: '#fff',
            hoverBackgroundColor: ['rgba(255,99,132,0.8)', 'rgba(54,162,235,0.8)', 'rgba(204,101,254,0.8)', 'rgba(255,206,86,0.8)']
          }]
        },
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
      margin: 30px 0;
    }
  }
</style>