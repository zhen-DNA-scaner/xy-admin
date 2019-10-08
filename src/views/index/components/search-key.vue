<template>
  <a-card class="analysis-search-key-wraper" title="线上热门搜索" :bordered=false>
    <a-dropdown slot="extra" :trigger="['click']">
      <a-icon class="more-ctrl" type="ellipsis" />
      <a-menu slot="overlay">
        <a-menu-item>操作一</a-menu-item>
        <a-menu-item>操作二</a-menu-item>
      </a-menu>
    </a-dropdown>
    <a-row>
      <a-col :span="11">
        <div>
          搜索用户数
          <a-tooltip>
            <template slot='title'>
              指标说明
            </template>
            <a-icon type="info-circle" />
          </a-tooltip>
        </div>
        <div class="number-data"><label>{{12321 | formatNumber}}</label> 12% <caret-up class="caret" fill="red" /></div>
        <canvas ref="searchCount" height="46"></canvas>
      </a-col>
      <a-col :span="11" :offset="2">
        <div>
          人均搜索次数
          <a-tooltip>
            <template slot='title'>
              指标说明
            </template>
            <a-icon type="info-circle" />
          </a-tooltip>
        </div>
        <div class="number-data"><label>{{2.7 | formatNumber}}</label> 2.4% <caret-down class="caret" fill="green" /></div>
        <canvas ref="searchAverage" height="46"></canvas>
      </a-col>
    </a-row>
    <a-table
      class="search-key-table"
      :columns="columns"
      :dataSource="tableData"
      :pagination="false"
      size="small"
      @change="changeTable"
    >
    </a-table>
  </a-card>
</template>

<script>
const columns = [{
  title: '排名',
  dataIndex: 'range',
  sorter: true,
}, {
  title: '搜索关键词',
  dataIndex: 'key',
}, {
  title: '用户数',
  dataIndex: 'userCount',
  sorter: true,
}, {
  title: '周涨幅',
  dataIndex: 'gain',
  sorter: true
}];

const tableData = [{
  range: 1,
  key: '搜索关键词-0',
  userCount: 980,
  gain: -0.4
},{
  range: 2,
  key: '搜索关键词-1',
  userCount: 861,
  gain: 0.55
},{
  range: 3,
  key: '搜索关键词-2',
  userCount: 579,
  gain: 0.28
},{
  range: 4,
  key: '搜索关键词-4',
  userCount: 511,
  gain: 0.5
},{
  range: 5,
  key: '搜索关键词-6',
  userCount: 561,
  gain: -0.78
},];

import caretUp from '@/components/icons/caret-up';
import caretDown from '@/components/icons/caret-down';
import Chart from 'chart.js';
export default {
  components: {
    caretUp,
    caretDown
  },
  mounted(){
    this.setSearchCountChartData();
    this.setSearchAverageChartData();
  },
  data(){
    return{
      columns,
      tableData: [...tableData],
    }
  },
  methods: {
    setSearchCountChartData(){
      const ctx = this.$refs.searchCount;
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['2019-10-7', '2019-10-8', '2019-10-9', '2019-10-10', '2019-10-11', '2019-10-11', '2019-10-12', '2019-10-13'],
          datasets: [
            {
              label: '访问量',
              backgroundColor: 'rgba(24, 144, 255, 0.2)',
              borderWidth: 2,
              borderColor: 'rgba(24, 144, 255, 1)',
              pointRadius: 0,
              pointHitRadius: 20,
              pointBackgroundColor: 'rgba(24, 144, 255, 1)',
              data: [1,6,4,8,3,7,2]
            }
          ]
        },
        options: {
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
        }
      })
    },
    setSearchAverageChartData(){
      const ctx = this.$refs.searchAverage;
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['2019-10-7', '2019-10-8', '2019-10-9', '2019-10-10', '2019-10-11', '2019-10-11', '2019-10-12', '2019-10-13'],
          datasets: [
            {
              label: '访问量',
              backgroundColor: 'rgba(24, 144, 255, 0.2)',
              borderWidth: 2,
              borderColor: 'rgba(24, 144, 255, 1)',
              pointRadius: 0,
              pointHitRadius: 20,
              pointBackgroundColor: 'rgba(24, 144, 255, 1)',
              data: [1,3,4,6,3,7,2]
            }
          ]
        },
        options: {
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
        }
      })
    },
    changeTable(pagination, filters, sorter){
      const order = sorter.order;
      order ? this.tableData = [...this.tableData.sort((a, b) => {
        const _a = a[sorter.field];
        const _b = b[sorter.field]
        return order === 'ascend' ? _a - _b : _b - _a;
      })] : this.tableData = [...tableData];
    }
  }
}
</script>

<style lang="scss">
  .analysis-search-key-wraper{
    .more-ctrl{
      cursor: pointer;
    }
    .number-data{
      display: flex;
      align-items: center;
      label{
        font-size: 2em;
        margin: .2em 1em .2em 0;
        display: inline-block;
      }
    }
    canvas{
      width: 100%;
    }
    .search-key-table{
      margin: 20px 0 0;
    }
  }
</style>