<template>
  <a-tabs class="dashbord-analysis-sales-card" defaultActiveKey="1" @change="changeTabs">
    <div slot="tabBarExtraContent" class="extra-content">
      <div class="days-selection">
        <span :class="{active: currentDate === 'today'}" @click="() => currentDate = 'today'">今日</span>
        <span :class="{active: currentDate === 'weekly'}" @click="() => currentDate = 'weekly'">本周</span>
        <span :class="{active: currentDate === 'monthly'}" @click="() => currentDate = 'monthly'">本月</span>
        <span :class="{active: currentDate === 'year'}" @click="() => currentDate = 'year'">全年</span>
      </div>
      <a-range-picker :defaultValue="[moment(), moment()]" @change="changeDate" />
    </div>
    <a-tab-pane class="pane" tab="销售额" key="1">
      <a-row>
        <a-col :span="16">
          <canvas ref="barchart" height="120"></canvas>
        </a-col>
        <a-col class="ranking-wraper" :span="7" :offset="1">
          <h4>门店销售排名</h4>
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
    <a-tab-pane class="pane" tab="访问量" key="2" forceRender>
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

import Chart from 'chart.js';
import moment from 'moment';
export default {
  mounted(){
    this.setBarChartData();
    this.setLineChartData();
  },
  data(){
    return{
      currentDate: 'today'
    }
  },
  methods: {
    moment,
    changeTabs(){},
    changeDate(){},
    setBarChartData(){
      const ctx = this.$refs.barchart;
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
          datasets: [
            {
              label: '销售趋势',
              backgroundColor: '#1890ff',
              borderWidth: 0,
              borderColor: '#fff',
              data: [7,5,4,2,4,7,5,6,5,9,6,3,1,5,3,6,5]
            }
          ]
        },
        options: {
          scales: {
            xAxes: [{
              gridLines: {
                display: false
              },
              barThickness: 30
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
    setLineChartData(){
      const ctx = this.$refs.linechart;
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['1时', '2时', '3时', '4时', '5时', '6时', '7时', '8时', '9时', '10时', '11时', '12时'],
          datasets: [
            {
              label: '访问量',
              backgroundColor: 'rgba(24, 144, 255, 0.05)',
              borderWidth: 2,
              borderColor: 'rgba(24, 144, 255, 1)',
              pointRadius: 0,
              pointHitRadius: 20,
              pointBackgroundColor: 'rgba(24, 144, 255, 1)',
              data: [7,5,4,2,4,7,5,6,5,9,6,3,1,5,3,6,5]
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
              }
            }]
          },
          legend: {
            display: false
          }
        }
      })
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