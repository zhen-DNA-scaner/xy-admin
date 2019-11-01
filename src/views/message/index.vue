<template>
  <div class="message-page">
    <breadcrumb :routes="routes" ref="breadcrumb"></breadcrumb>
    <div class="container">
      <div class="tools-bar">
        <a-button class="item" @click="onDelete">删除</a-button>
        <a-button class="item" @click="onRead(false)">标记为已读</a-button>
        <a-button class="item" @click="onRead(true)">全部已读</a-button>
        <a-radio-group class="item" :value="type" @change="e => type = e.target.value">
          <a-radio-button value="sitemail">站内信</a-radio-button>
          <a-radio-button value="message">互动通知</a-radio-button>
        </a-radio-group>
        <!-- <a-checkbox>仅显示未读</a-checkbox> -->
        <span class="end">共 {{count}} 条消息，其中<b class="error">{{noReadCount}}</b>条未读</span>
      </div>
      <div class="content-wraper">
        <sitemail-table
          v-show="type === 'sitemail'"
          ref="sitemail"
          @rowsChange="setCount"
        />

        <message-table
          v-show="type === 'message'"
          ref="message"
          @rowsChange="setCount"
        >
        </message-table>
      </div>
    </div>
  </div>
</template>

<script>
import sitemailTable from './sitemail';
import messageTable from './message';
export default {
  components: {
    sitemailTable,
    messageTable
  },
  data(){
    return{
      type: 'sitemail',
      routes: [
        {
          path: '/',
          breadcrumbName: 'home',
          multilingual: 'menu.home' // true(boolean) or language file attribute(string)
        },{
          breadcrumbName: '消息中心'
        }
      ],
      count: 0,
      noReadCount: 0
    }
  },
  watch: {
    type(){
      this.setCount();
    },
    '$route.query'({ type }){
      this.type = type === 'message' ? type : 'sitemail';
    }
  },
  methods: {
    setCount(){
      const {count, noReadCount} = this.$refs[this.type].listData;
      this.count = count;
      this.noReadCount = noReadCount;
    },
    onDelete(){
      this.$refs[this.type].deleteRows();
    },
    onRead(isAll){
      this.$refs[this.type].remarkRead(isAll);
    }
  }
}
</script>

<style lang="scss" scoped>
.message-page{
  .tools-bar{
    display: flex;
    align-items: center;
    .item{
      margin-right: 10px;
    }
    .end{
      flex: 1 1 auto;
      display: flex;
      justify-content: flex-end;
      .error{
        margin: 0 5px;
      }
    }
  }
  .content-wraper{
    @include contentPannel;
    margin-top: 20px;
  }
}
</style>