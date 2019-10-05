<template>
  <a-row :gutter="20">
    <a-col :span="6">
      <a-card class="card" :bordered=false>
        <div class="title">
          总销售额
          <a-tooltip>
            <template slot='title'>
              销售额相关描述
            </template>
            <a-icon type="info-circle" />
          </a-tooltip>
        </div>
        <span class="count">¥ 126,560</span>
        <div class="middle trend">
          <div class="item">周同比 12% <caret-up class="caret" fill="red" /></div>
          <div class="item">日同比 11% <caret-down class="caret" fill="green" /></div>
        </div>
        <a-divider class="divider" />
        日销售额￥12,423
      </a-card>
    </a-col>
    <a-col :span="6">
      <a-card class="card" :bordered=false>
        <div class="title">
          访问量
          <a-tooltip>
            <template slot='title'>
              访问量相关描述
            </template>
            <a-icon type="info-circle" />
          </a-tooltip>
        </div>
        <span class="count">8,846</span>
        <div class="middle analysis-chart-mini">
          <canvas ref="linechart" height="46"></canvas>
        </div>
        <a-divider class="divider" />
        日访问量 1,234
      </a-card> 
    </a-col>
    <a-col :span="6">
      <a-card class="card" :bordered=false>
        <div class="title">
          总订单量
          <a-tooltip>
            <template slot='title'>
              指标说明
            </template>
            <a-icon type="info-circle" />
          </a-tooltip>
        </div>
        <span class="count">6,560</span>
        <div class="middle analysis-chart-mini">
          <canvas ref="barchart" height="46"></canvas>
        </div>
        <a-divider class="divider" />
        转化率 60%
      </a-card>   
    </a-col>
    <a-col :span="6">
      <a-card class="card" :bordered=false>
        <div class="title">
          运营效果
          <a-tooltip>
            <template slot='title'>
              指标说明
            </template>
            <a-icon type="info-circle" />
          </a-tooltip>
        </div>
        <span class="count">{{operationTxt}}</span>
        <div class="middle analysis-chart-mini">
          <a-progress :percent="operationPercent * 100" :status="operationStatus" />
        </div>
        <a-divider class="divider" />
        <div class="trend">
          <div class="item">周同比 12% <caret-up class="caret" fill="red" /></div>
          <div class="item">日同比 11% <caret-down class="caret" fill="green" /></div>
        </div>
      </a-card>   
    </a-col>
  </a-row>
</template>

<script>
const chartOptions = {
  responsive: false,
  elements: {
    point: {
      // 点命中半径
      hitRadius: 10
    }
  },
  legend: {
    display: false
  },
  scales: {
    xAxes: [{
      display: false
    }],
    yAxes: [{
      display: false
    }],
  },
  tooltips: {
      custom: function(tooltipModel){
        const resetModel = {
          backgroundColor: 'rgba(0,0,0,0.4)',
          x: 0,
          y: -1
        };
        tooltipModel = Object.assign(tooltipModel, resetModel);
        return tooltipModel;
      }
  }
};

import caretUp from '@/components/icons/caret-up';
import caretDown from '@/components/icons/caret-down';
import Chart from 'chart.js';
export default {
  components: {
    caretUp,
    caretDown
  },
  mounted(){
    this.$nextTick(()=>{
      this.setLineChartData();
      this.setBarChartData();
    });
  },
  data(){
    return{
      lineChartWidth: 0,
      operationPercent: .85,
      operationStatus: 'success'
    }
  },
  computed: {
    operationTxt(){
      const p = this.operationPercent
      let mapTxt;
      switch (true) {
        case p <= 100 && p >= 0.95:
          mapTxt = '优秀';
          this.operationStatus = 'success';
          break;

        case p < 0.95 && p >= 0.8:
          mapTxt = '良好';
          this.operationStatus = 'active';
          break;
      
        case p < 0.8 && p >= 0.7:
          mapTxt = '中等';
          this.operationStatus = 'active';
          break;

        case p < 0.7 && p >= 0.6:
          this.operationStatus = 'active';
          mapTxt = '较差';
          break;

        case p < 0.6 && p >= 0.3:
          this.operationStatus = 'exception';
          mapTxt = '很差';
          break;

        case p < 0.3:
          mapTxt = '极差';
          this.operationStatus = 'exception';
          break;

        default:
          break;
      }
      return mapTxt;
    }
  },
  methods: {
    setLineChartData(){
      const ctx = this.$refs.linechart;
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['2019-10-04','2019-10-05','2019-10-06','2019-10-07','2019-10-08','2019-10-09','2019-10-10','2019-10-10','2019-10-10','2019-10-10','2019-10-10','2019-10-10','2019-10-10','2019-10-10','2019-10-10','2019-10-10','2019-10-10'],
          datasets: [
            {
              backgroundColor: '#f87979',
              borderWidth: 0,
              borderColor: '#fff',
              pointRadius: 0,
              pointHoverBorderWidth: 2,
              pointHoverBorderColor: '#fff',
              pointHoverBackgroundColor: '#f87979',
              data: [7,5,4,2,4,7,5,6,5,9,6,3,1,5,3,6,5]
            }
          ]
        },
        options: chartOptions
      });
    },
    setBarChartData(){
      const ctx = this.$refs.barchart;
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['2019-10-04','2019-10-05','2019-10-06','2019-10-07','2019-10-08','2019-10-09','2019-10-10','2019-10-10','2019-10-10','2019-10-10','2019-10-10','2019-10-10','2019-10-10','2019-10-10','2019-10-10','2019-10-10','2019-10-10'],
          datasets: [
            {
              backgroundColor: '#1890ff',
              borderWidth: 0,
              borderColor: '#fff',
              data: [7,5,4,2,4,7,5,6,5,9,6,3,1,5,3,6,5]
            }
          ]
        },
        options: Object.assign(chartOptions, {
          scales: {
            xAxes: [{
              display: false,
              barThickness: 7
            }],
            yAxes: [{
              display: false
            }],
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .title{
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: $text-color-secondary;
  }
  .count{
    font-size: 2em;
    white-space: nowrap;
  }
  .middle{
    height: 46px;
    align-items: flex-end;
    width: 100%;
  }
  .trend{
    font-size: 13px;
    display: flex;
    white-space: nowrap;
    .item{
      display: flex;
      align-items: center;
      flex: 1;
    }
    .caret{
      font-size: 10px;
      margin-left: 5px;
    }
  }
  .card{
    .divider{
      margin: 10px 0;
    }
  }
  .analysis-chart-mini{
    display: flex;
    align-items: flex-end;
    canvas{
      width: 100%;
    }
  }
</style>