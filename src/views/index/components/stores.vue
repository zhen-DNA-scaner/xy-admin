<template>
  <a-card class="analysis-stores" title="商品转化率" :bordered=false>
    <div slot="extra" class="card-head-extra">
      <div class="days-selection">
        <span :class="{active: currentDate === 'today'}" @click="changeDate('today')">今日</span>
        <span :class="{active: currentDate === 'week'}" @click="changeDate('week')">本周</span>
        <span :class="{active: currentDate === 'month'}" @click="changeDate('month')">本月</span>
        <span :class="{active: currentDate === 'year'}" @click="changeDate('year')">全年</span>
      </div>
      <a-range-picker :defaultValue="[moment(), moment()]" @change="changeDate" />
    </div>
    <a-skeleton :loading="!goods" active :paragragh="{rows: 8}">
      <div v-if="goods">
        <a-tabs type="card" :defaultActiveKey="0" @change="changeStores">
          <a-tab-pane v-for="(item, i) in goods" :key="i">
            <div slot="tab" class="tab-item">
              <h3>{{item.name}}</h3>
              <div class="info-wraper">
                <div class="info">
                  <span class="label">转化率</span>
                  <span class="rate">{{ item.paied / item.uv | formatPercent }}</span>
                </div>
                <canvas :ref="`storesChart_${i}`" width="50" height="50"></canvas>
              </div>
            </div>
          </a-tab-pane>
        </a-tabs>
        <canvas ref="storesContentChart" height="80"></canvas>
      </div>
    </a-skeleton>
  </a-card>
</template>

<script>
import moment from 'moment';
import Chart from 'chart.js';
// import { getAnalysisGoods, getAnalysisGood } from '@/utils/api';
import { getCurrentDateRange } from '@/utils';


function resetChartData(chart, labels, datasets){
  chart.data.labels = labels;
  chart.data.datasets = datasets;
  chart.update();
}

export default {
  async mounted(){
    const goodsRes = await this.$axios.get('/api/analysis/goods');

    if(goodsRes.data && goodsRes.data.code === 20000){
      this.goods = goodsRes.data.data;
      setTimeout(()=>{
        this.initChart();
        this.setStoresChart();
      }, 0);
    }
  },
  data(){
    return{
      currentDate: 'today',
      goods: null,
      chart: null,
      activeStores: 0
    }
  },
  methods: {
    moment,
    initChart(){
      const _this = this;
      this.goods.forEach((v, i) => {
        const ctx = _this.$refs[`storesChart_${i}`];
        new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: ['支付笔数', '客流量'],
            datasets: [{
              data: [v.paied, v.uv - v.paied],
              backgroundColor: ['rgb(24, 144, 255)', 'rgba(0, 0, 0, 0.1)'],
              borderColor: '#fff',
              borderWidth: 0,
              hoverBorderWidth: 0,
              hoverBorderColor: '#fff',
            }]
          },
          options: {
            responsive: false,
            tooltips: {
              enabled: false
            },
            cutoutPercentage: 50,
            legend: {
              display: false
            }
          }
        })
      })
    },
    async setStoresChart(dateRange){
      if(!dateRange) dateRange = getCurrentDateRange();
      let res = await this.$axios.get(`/api/analysis/good?id=${this.goods[this.activeStores]._id}&startDate=${dateRange.startDate}&endDate=${dateRange.endDate}`);
      if(!res.data || res.data.code !== 20000) return false;

      const labels = res.data.data.labels;
      let datasets = res.data.data.datasets;
      const uv = {
        backgroundColor: 'rgba(24, 144, 255, 0.03)',
        borderWidth: 2,
        borderColor: 'rgba(24, 144, 255, 1)',
        pointRadius: 0,
        pointHitRadius: 20,
        pointBackgroundColor: 'rgba(24, 144, 255, 1)',
      };
      const paied = {
        backgroundColor: 'rgba(240, 72, 100, 0.03)',
        borderWidth: 2,
        borderColor: 'rgb(240, 72, 100)',
        pointRadius: 0,
        pointHitRadius: 20,
        pointBackgroundColor: 'rgb(240, 72, 100)',
      };

      datasets = datasets.map(v => Object.assign(v.label === '客流量' ? uv : paied, v))

      if (this.chart) {
        resetChartData(this.chart, labels, datasets);
        return false;
      }

      const ctx = this.$refs.storesContentChart;
      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels,
          datasets
        },
        options: {
          scales: {
            xAxes: [{
              gridLines: {
                display: false
              }
            }],
            yAxes: [{
              gridLines: {
                borderDash: [4]
              }
            }]
          }
        }
      })
    },
    changeStores(key){
      this.activeStores = key;
      this.setStoresChart();
    },
    changeDate(type, date){
      this.currentDate = type;
      if(typeof type === 'string') {
        this.setStoresChart(getCurrentDateRange({ type }))
      } else {
        this.setStoresChart({
          startDate: date[0],
          endDate: date[1]
        });
      }
    },
  }
}
</script>

<style lang="scss">
  .analysis-stores{
    background-color: #fff;
    .card-head-extra{
      display: flex;
      align-items: center;
    }
    .days-selection{
      margin-right: 10px;
      span{
        margin: 0 10px;
        cursor: pointer;
      }
      .active{
        color: $primary-color;
      }
    }
    .ant-tabs-card-bar .ant-tabs-tab{
      background: none!important;
      border: 0!important;
    }
    .ant-tabs-card-bar .ant-tabs-tab-active{
      color: inherit!important;
      h3{
        color: $primary-color;
      }
    }
    .ant-tabs-nav .ant-tabs-tab:hover{
      color: inherit!important;
      h3{
        color: $primary-color;
      }
    }
    .ant-tabs-nav-container{
      height: auto!important;
    }
    .ant-tabs-bar{
      border: 0;
    }
    .tab-item{
      width: 145px;
      margin: 20px;
    }
    h3{
      margin: 0;
    }
    .info-wraper{
      display: flex;
      align-items: center;
      canvas{
        margin-left: 20px;
      }
    }
    .info{
      span{
        display: block;
      }
      .label{
        color: #999;
        line-height: 1;
      }
      .rate{
        font-size: 1.6em;
      }
    }
  }
</style>