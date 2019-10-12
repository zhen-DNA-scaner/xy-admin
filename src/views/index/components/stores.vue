<template>
  <a-card class="analysis-stores" title="商品转化率" :bordered=false>
    <div slot="extra" class="card-head-extra">
      <div class="days-selection">
        <span :class="{active: currentDate === 'today'}" @click="() => currentDate = 'today'">今日</span>
        <span :class="{active: currentDate === 'weekly'}" @click="() => currentDate = 'weekly'">本周</span>
        <span :class="{active: currentDate === 'monthly'}" @click="() => currentDate = 'monthly'">本月</span>
        <span :class="{active: currentDate === 'year'}" @click="() => currentDate = 'year'">全年</span>
      </div>
      <a-range-picker :defaultValue="[moment(), moment()]" @change="changeDate" />
    </div>
    <a-tabs type="card" :defaultActiveKey="0">
      <a-tab-pane v-for="(item, i) in data" :key="i">
        <div slot="tab" class="tab-item">
          <h3>{{item.title}}</h3>
          <div class="info-wraper">
            <div class="info">
              <span class="label">转化率</span>
              <span class="rate">{{ item.paied / item.ip | formatPercent }}</span>
            </div>
            <canvas :ref="`storesChart_${i}`" width="50" height="50"></canvas>
          </div>
        </div>
        <div>
          <canvas :ref="`storesContentChart_${i}`" height="80"></canvas>
        </div>
      </a-tab-pane>
    </a-tabs> 
  </a-card>
</template>

<script>
import moment from 'moment';
import Chart from 'chart.js';
export default {
  mounted(){
    this.initChart();
    this.initStoresContentChart();
  },
  data(){
    return{
      currentDate: 'today',
      data: [
        {
          _id: 1,
          title: 'stores 1',
          content: 'content of stores 1',
          ip: 120,
          paied: 20,
          
        },{
          _id: 2,
          title: 'stores 2',
          content: 'content of stores 2',
          ip: 100,
          paied: 35
        },{
          _id: 3,
          title: 'stores 3',
          content: 'content of stores 3',
          ip: 70,
          paied: 35
        },{
          _id: 1,
          title: 'stores 4',
          content: 'content of stores 4',
          ip: 240,
          paied: 35
        },{
          _id: 1,
          title: 'stores 5',
          content: 'content of stores 5',
          ip: 640,
          paied: 35
        },{
          _id: 1,
          title: 'stores 6',
          content: 'content of stores 6',
          ip: 340,
          paied: 35
        },{
          _id: 1,
          title: 'stores 7',
          content: 'content of stores 7',
          ip: 230,
          paied: 35
        },{
          _id: 1,
          title: 'stores 8',
          content: 'content of stores 8',
          ip: 100,
          paied: 35
        },{
          _id: 1,
          title: 'stores 9',
          content: 'content of stores 9',
          ip: 100,
          paied: 35
        },{
          _id: 1,
          title: 'stores 10',
          content: 'content of stores 10',
          ip: 100,
          paied: 35
        },{
          _id: 1,
          title: 'stores 11',
          content: 'content of stores 11',
          ip: 100,
          paied: 35
        },{
          _id: 1,
          title: 'stores 12',
          content: 'content of stores 12',
          ip: 100,
          paied: 35
        },{
          _id: 1,
          title: 'stores 13',
          content: 'content of stores 13',
          ip: 100,
          paied: 35
        },{
          _id: 1,
          title: 'stores 14',
          content: 'content of stores 14',
          ip: 100,
          paied: 35
        },{
          _id: 1,
          title: 'stores 15',
          content: 'content of stores 15',
          ip: 100,
          paied: 35
        },{
          _id: 1,
          title: 'stores 16',
          content: 'content of stores 16',
          ip: 100,
          paied: 35
        },{
          _id: 1,
          title: 'stores 17',
          content: 'content of stores 17',
          ip: 100,
          paied: 35
        },{
          _id: 1,
          title: 'stores 18',
          content: 'content of stores 18',
          ip: 100,
          paied: 35
        },
      ]
    }
  },
  methods: {
    moment,
    initChart(){
      var _this = this;
      this.data.forEach((v, i) => {
        const ctx = _this.$refs[`storesChart_${i}`];
        new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: ['支付笔数', '客流量'],
            datasets: [{
              data: [v.paied, v.ip - v.paied],
              backgroundColor: ['rgb(24, 144, 255)', 'rgba(0, 0, 0, 0.1)'],
              borderColor: '#fff',
              hoverBorderWidth: 2,
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
    initStoresContentChart(i = 0){
      const ctx = this.$refs[`storesContentChart_${i}`];
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
          datasets: [{
            label: '下单笔数',
            data: [123, 134, 121, 165, 156, 144, 143, 125, 200, 197, 213, 190, 210, 217, 197, 221, 199, 231, 233, 251, 243, 211, 186, 153],
            backgroundColor: 'rgba(240, 72, 100, 0.03)',
            borderWidth: 2,
            borderColor: 'rgb(240, 72, 100)',
            pointRadius: 0,
            pointHitRadius: 20,
            pointBackgroundColor: 'rgb(240, 72, 100)',
          },{
            label: '客流量',
            data: [232, 243, 235, 211, 235, 244, 254, 300, 312, 300, 321, 325, 300, 321, 352, 367, 300, 353, 432, 411, 400, 422, 342, 299],
            backgroundColor: 'rgba(24, 144, 255, 0.03)',
            borderWidth: 2,
            borderColor: 'rgba(24, 144, 255, 1)',
            pointRadius: 0,
            pointHitRadius: 20,
            pointBackgroundColor: 'rgba(24, 144, 255, 1)',
          }]
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
    changeDate(){},
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