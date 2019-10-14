<template>
  <a-tabs class="dashbord-analysis-sales-card" defaultActiveKey="sales" @change="changeTabs">
    <div slot="tabBarExtraContent" class="extra-content">
      <div class="days-selection">
        <span :class="{active: currentDate === 'today'}" @click="changeDate('today')">今日</span>
        <span :class="{active: currentDate === 'week'}" @click="changeDate('week')">本周</span>
        <span :class="{active: currentDate === 'month'}" @click="changeDate('month')">本月</span>
        <span :class="{active: currentDate === 'year'}" @click="changeDate('year')">本年</span>
      </div>
      <a-range-picker :defaultValue="[moment(), moment()]" @change="changeDate" />
    </div>
    <a-tab-pane class="pane" tab="销售额" key="sales">
      <a-row>
        <a-col :span="16">
          <a-skeleton :loading="!salesData" active :paragraph="{rows: 8}">
            <canvas ref="barchart" height="120"></canvas>
          </a-skeleton>
        </a-col>
        <a-col class="ranking-wraper" :span="7" :offset="1">
          <a-skeleton :loading="!salesData" active :paragraph="{rows: 6}">
            <div>
              <h4>门店销售排名</h4>
              <ul v-if="salesData">
                <li v-for="(item, i) in salesData.rank" :key="i">
                  <label>{{ i+1 }}</label>
                  <div class="content">
                    <span>{{ item.name }}</span>
                    <span>{{ item.volume | formatNumber }}</span>
                  </div>
                </li>
              </ul>
            </div>
          </a-skeleton>
        </a-col>
      </a-row>
    </a-tab-pane>
    <a-tab-pane class="pane" tab="访问量" key="pv" forceRender>
      <a-row>
        <a-col :span="16">
          <canvas ref="linechart" height="120"></canvas>
        </a-col>
        <a-col class="ranking-wraper" :span="7" :offset="1">
          <h4>门店流量排名</h4>
          <ul>
            <li v-for="n in 7" :key="n">
              <label>{{n}}</label>
              <div class="content">
                <span>工专路 0 号店</span>
                <span>{{ 323332 | formatNumber }}</span>
              </div>
            </li>
          </ul>
        </a-col>
      </a-row>
    </a-tab-pane>
  </a-tabs>
</template>

<script>
function resetChartData(chart, labels, data){
  chart.data.labels = labels;
  chart.data.datasets[0].data = data;
  chart.update();
}

import Chart from 'chart.js';
import moment from 'moment';
import { getSales, getPV } from '@/utils/api';
export default {
  async mounted(){
    await this.setsales({
      startDate: '2019-10-10',
      endDate: '2019-10-10'
    });
  },
  data(){
    return{
      currentDate: 'today',
      activeTab: 'sales',
      pvData: null,
      salesData: null,
      salesChart: null,
      pvChart: null
    }
  },
  methods: {
    moment,
    changeTabs(key){
      this.activeTab = key;
      this.changeDate(this.currentDate)
    },
    changeDate(type, date){
      this.currentDate = type;
      if(typeof type === 'string') {
        const now = new Date();
        const today = now.toLocaleDateString().replace(/\//g, '-');

        switch (type) {
          case 'today':
            this[`set${this.activeTab}`]({
              startDate: today,
              endDate: today
            });
            break;

          case 'week':
            var day = now.getDay();
            var DAYSTAMP = 24 * 60 * 60 * 1000;
            DAYSTAMP = DAYSTAMP * ( day ? day : 7 );
            this[`set${this.activeTab}`]({
              startDate: new Date(now.getTime() - DAYSTAMP).toLocaleDateString().replace(/\//g, '-'),
              endDate: today
            });
            break;

          case 'month':
            var startDate = today.split('-');
            startDate[2] = 1;
            startDate = startDate.join('-');
            this[`set${this.activeTab}`]({
              startDate,
              endDate: today
            });
            break;
        
          default:
            startDate = today.split('-');
            startDate[1] = 1;
            startDate = startDate.join('-');
            this[`set${this.activeTab}`]({
              startDate,
              endDate: today
            });
            break;
        }
      } else {
        this[`set${this.activeTab}`]({
          startDate: date[0],
          endDate: date[1]
        });
      }
    },
    setSalesChartData(){
      const labels = this.salesData.labels;
      const data = this.salesData.data;
      const len = this.salesData.labels.length;
      let barThickness = 40;

      if (len > 10) barThickness = 400 / len;

      // 只是更新
      if (this.salesChart) {
        this.salesChart.options.scales.xAxes[0].barThickness = barThickness;
        resetChartData(this.salesChart, labels, data);
        return false;
      }

      const ctx = this.$refs.barchart;
      this.salesChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels,
          datasets: [
            {
              label: '销售趋势',
              backgroundColor: '#1890ff',
              borderWidth: 0,
              borderColor: '#fff',
              data
            }
          ]
        },
        options: {
          scales: {
            xAxes: [{
              gridLines: {
                display: false
              },
              barThickness
            }],
            yAxes: [{
              gridLines: {
                borderDash: [4]
              },
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      })
    },
    setPVChartData(){
      const labels = this.pvData.labels;
      const data = this.pvData.data;

      // 只是更新
      if (this.pvChart) {
        resetChartData(this.pvChart, labels, data)
        return false;
      }

      const ctx = this.$refs.linechart;
      this.pvChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels,
          datasets: [
            {
              label: '访问趋势',
              backgroundColor: 'rgba(24, 144, 255, .2)',
              borderWidth: 2,
              borderColor: 'rgba(24, 144, 255, 1)',
              pointRadius: 0,
              pointHitRadius: 20,
              pointBackgroundColor: 'rgba(24, 144, 255, 1)',
              data
            }
          ]
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
              },
              ticks: {
                beginAtZero: true
              }
            }]
          },
          legend: {
            display: false
          }
        }
      })
    },
    async setsales({ startDate, endDate }){
      const res = await getSales({ query: { startDate, endDate } });
      if(res.data.code === 20000){
        this.salesData = res.data.data;
        setTimeout(()=>{
          this.setSalesChartData();
        }, 0);
      }
    },
    async setpv({ startDate, endDate }){
      const res = await getPV({ query: { startDate, endDate } });
      if(res.data.code === 20000){
        this.pvData = res.data.data;
        setTimeout(()=>{
          this.setPVChartData();
        }, 0);
      }
    },
  }
}
</script>

<style lang="scss">
  .dashbord-analysis-sales-card{
    background-color: #fff;
    margin: 0 0 20px 0;
    .ant-tabs-bar{
      padding: 0 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .pane{
      padding: 4px 20px 20px;
    }
    .extra-content{
      display: flex;
      align-items: center;
    }
    .ant-tabs-extra-content{
      order: 2;
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
    .ant-tabs-nav .ant-tabs-tab{
      padding: 16px;
    }
    .ranking-wraper{
      ul{
        padding: 0;
        margin-top: 25px;
      }
      label{
        display: inline-block;
        width: 18px;
        height: 18px;
        flex: 0 0 18px;
        border-radius: 50%;
        background-color: rgba(0,0,0,0.1);
        margin-right: 5px;
        text-align: center;
        line-height: 18px;
        font-size: 12px;
      }
      li{
        display: flex;
        align-items: center;
        margin: 18px 0;
        &:nth-child(1) label{
          background-color: $error-color;
          color: #fff;
        }
        &:nth-child(2) label{
          background-color: $warning-color;
          color: #fff;
        }
        &:nth-child(3) label{
          background-color: $link-color;
          color: #fff;
        }
      }
      .content{
        display: flex;
        justify-content: space-between;
        flex: 1 0 auto;
      }
    }
  }
</style>