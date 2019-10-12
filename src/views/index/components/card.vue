<template>
  <a-row :gutter="20">
    <a-col :span="6">
      <a-card class="card" :bordered=false>
        <a-skeleton :loading="!(sales.count || sales.count === 0)" active>
          <div>
            <div class="title">
              总销售额
              <a-tooltip>
                <template slot='title'>
                  {{ sales.descriptions }}
                </template>
                <a-icon type="info-circle" />
              </a-tooltip>
            </div>
            <span class="count">¥ {{ sales.count | formatNumber }}</span>
            <div class="middle trend">
              <div class="item">
                周同比 {{ sales.trendWeekly | formatPercent }}
                <caret-up v-if="sales.trendWeekly && sales.trendWeekly > 0" class="caret" fill="red" />
                <caret-down v-else class="caret" fill="green" />
              </div>
              <div class="item">
                日同比 {{ sales.trendDaily | formatPercent }}
                <caret-up v-if="sales.trendDaily && sales.trendDaily > 0" class="caret" fill="red" />
                <caret-down v-else class="caret" fill="green" />
              </div>
            </div>
            <a-divider class="divider" />
            <div class="foot">日销售额￥{{ sales.countDaily | formatNumber }}</div>
          </div>
        </a-skeleton>
      </a-card>
    </a-col>
    <a-col :span="6">
      <a-card class="card" :bordered=false>
        <a-skeleton :loading="!(pv.count || pv.count === 0)" active>
          <div>
            <div class="title">
              访问量
              <a-tooltip>
                <template slot='title'>
                  {{ pv.descriptions }}
                </template>
                <a-icon type="info-circle" />
              </a-tooltip>
            </div>
            <span class="count">{{ pv.count | formatNumber }}</span>
            <div class="middle analysis-chart-mini">
              <canvas ref="linechart" height="46"></canvas>
            </div>
            <a-divider class="divider" />
            <div class="foot">日访问量 {{ pv.countDaily | formatNumber }}</div>
          </div>
        </a-skeleton>
      </a-card> 
    </a-col>
    <a-col :span="6">
      <a-card class="card" :bordered=false>
        <a-skeleton :loading="!(order.count || order.count === 0)" active>
          <div>
            <div class="title">
              总订单量
              <a-tooltip>
                <template slot='title'>
                  {{ order.descriptions }}
                </template>
                <a-icon type="info-circle" />
              </a-tooltip>
            </div>
            <span class="count">{{ order.count | formatNumber }}</span>
            <div class="middle analysis-chart-mini">
              <canvas ref="barchart" height="46"></canvas>
            </div>
            <a-divider class="divider" />
            <div class="foot">转化率 {{ order.paiedRate | formatPercent }}</div>
          </div>
        </a-skeleton>
      </a-card>   
    </a-col>
    <a-col :span="6">
      <a-card class="card" :bordered=false>
        <a-skeleton :loading="!(operation.score || operation.score === 0)" active>
          <div>
            <div class="title">
              运营效果
              <a-tooltip>
                <template slot='title'>
                  {{operation.descriptions}}
                </template>
                <a-icon type="info-circle" />
              </a-tooltip>
            </div>
            <span class="count">{{operation.descriptions}}</span>
            <div class="middle analysis-chart-mini">
              <a-progress :percent="operation.score * 100" status="active" />
            </div>
            <a-divider class="divider" />
            <div class="foot trend">
              <div class="item">
                周同比 {{ operation.trendWeekly | formatPercent }}
                <caret-up v-if="operation.trendWeekly && operation.trendWeekly > 0" class="caret" fill="red" />
                <caret-down v-else class="caret" fill="green" />
              </div>
              <div class="item">
                日同比 {{ operation.trendDaily | formatPercent }}
                <caret-up v-if="operation.trendDaily && operation.trendDaily > 0" class="caret" fill="red" />
                <caret-down v-else class="caret" fill="green" />
              </div>
            </div>
          </div>
        </a-skeleton>
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
import { getAnalysis } from '@/utils/api';
export default {
  components: {
    caretUp,
    caretDown
  },
  async mounted(){
    const res = await getAnalysis();
    if(res.data.code && res.data.code === 20000){
      for(let k in res.data.data){
        this[k] = res.data.data[k];
      }
    }
    setTimeout(()=>{
      this.setPVChartData();
      this.setOrderChartData();
    }, 0);
  },
  data(){
    return{
      sales: {},
      pv: {},
      order: {},
      operation: {}
    }
  },
  methods: {
    setPVChartData(){
      const ctx = this.$refs.linechart;
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.pv.data[0].labels,
          datasets: [
            {
              backgroundColor: '#f87979',
              borderWidth: 0,
              borderColor: '#fff',
              pointRadius: 0,
              pointHoverBorderWidth: 2,
              pointHoverBorderColor: '#fff',
              pointHoverBackgroundColor: '#f87979',
              data: this.pv.data[0].datasets[0].data
            }
          ]
        },
        options: chartOptions
      });
    },
    setOrderChartData(){
      const ctx = this.$refs.barchart;
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: this.order.data[0].labels,
          datasets: [
            {
              backgroundColor: '#1890ff',
              borderWidth: 0,
              borderColor: '#fff',
              data: this.order.data[0].datasets[0].data
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
      margin-left: 5px;
    }
  }
  .card{
    margin-bottom: 20px;
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
  .foot{
    margin-bottom: -12px;
  }
</style>