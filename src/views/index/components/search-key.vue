<template>
  <a-card class="analysis-search-key-wraper" title="线上热门搜索" :bordered=false>
    <a-dropdown slot="extra" :trigger="['click']">
      <a-icon class="more-ctrl" type="ellipsis" />
      <a-menu slot="overlay">
        <a-menu-item>操作一</a-menu-item>
        <a-menu-item>操作二</a-menu-item>
      </a-menu>
    </a-dropdown>
    <a-skeleton :loading="!tableData" active :paragraph="{rows: 9}">
      <div>
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
            <div class="number-data">
              <label>{{usersSearch.count | formatNumber}}</label> 
              {{ usersSearch.trend | formatPercent }} 
              <caret-up v-if="usersSearch.trend >= 0" class="caret" fill="red" />
              <caret-down v-else class="caret" fill="green" />
            </div>
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
            <div class="number-data">
              <label>{{average.count | formatNumber}}</label> 
              {{ average.trend | formatPercent }}
              <caret-up v-if="average.trend >= 0" class="caret" fill="red" />
              <caret-down v-else class="caret" fill="green" />
            </div>
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
        <a-pagination v-model="page" class="analysis-searchkey-pagination" size="small" :total="total" @change="changePagination" />
      </div>
    </a-skeleton>
  </a-card>
</template>

<script>
const columns = [{
  title: '排名',
  dataIndex: 'rank',
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
  dataIndex: 'weekTrend',
  sorter: true
}];

import caretUp from '@/components/icons/caret-up';
import caretDown from '@/components/icons/caret-down';
import Chart from 'chart.js';
import { getAnalysisSearch } from '@/utils/api';
export default {
  components: {
    caretUp,
    caretDown
  },
  async mounted(){
    const res = await getAnalysisSearch();
    if(res.data.code && res.data.code === 20000){
      this.tableData = res.data.data.list;
      this.usersSearch = res.data.data.usersSearch;
      this.average = res.data.data.average;
      this.total = res.data.data.total;
      setTimeout(()=>{
        this.setSearchCountChartData(res.data.data.usersSearch.datasets);
        this.setSearchAverageChartData(res.data.data.average.datasets);
      }, 0)
    }
  },
  data(){
    return{
      columns,
      tableData: [],
      usersSearch: {},
      average: {},
      total: 0,
      sortKey: '',
      sort: '',
      page: 1
    }
  },
  methods: {
    setSearchCountChartData(datasets){
      const ctx = this.$refs.searchCount;
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: datasets.labels,
          datasets: [
            {
              label: '访问量',
              backgroundColor: 'rgba(24, 144, 255, 0.2)',
              borderWidth: 2,
              borderColor: 'rgba(24, 144, 255, 1)',
              pointRadius: 0,
              pointHitRadius: 20,
              pointBackgroundColor: 'rgba(24, 144, 255, 1)',
              data: datasets.data
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
    setSearchAverageChartData(datasets){
      const ctx = this.$refs.searchAverage;
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: datasets.labels,
          datasets: [
            {
              label: '访问量',
              backgroundColor: 'rgba(24, 144, 255, 0.2)',
              borderWidth: 2,
              borderColor: 'rgba(24, 144, 255, 1)',
              pointRadius: 0,
              pointHitRadius: 20,
              pointBackgroundColor: 'rgba(24, 144, 255, 1)',
              data: datasets.data
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
    async changeTable(pagination, filters, sorter){
      const mapOrder = {
        'ascend': 'asc',
        'descend': 'descend',
      };
      this.sortKey = sorter.columnKey;
      this.sort = mapOrder[sorter.order] || '';
      const res = await getAnalysisSearch({ query: { key: this.sortKey, sort: this.sort } });
      this.tableData = res.data.data.list;
      this.page = 1;
    },
    async changePagination(page){
      const res = await getAnalysisSearch({ query: { key: this.sortKey, sort: this.sort, page } });
      this.tableData = res.data.data.list;
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
  .analysis-searchkey-pagination{
    margin: 10px 0 0;
    display: flex;
    justify-content: flex-end;
  }
</style>