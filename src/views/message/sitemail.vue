<template>
  <a-table
    class="sitemail-table"
    :rowSelection="rowSelection"
    :columns="columns"
    :dataSource="data"
    rowKey="_id"
    :pagination="{
      total: +listData.list.length,
      defaultPageSize: 15
    }"
  >
    <template slot="msgTitle" slot-scope="text, record">
      <a v-if="record.isRead" class="gray" href="javascript:;">
        <span class="icon isread-icon">
          <svg t="1572531747007" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3574" width="1.1em" height="1.1em"><path d="M90.352941 493.929412l-36.141176-48.188236 120.470588-102.4 36.141176 48.188236-120.470588 102.4z m843.294118 0l-120.470588-102.4 42.164705-48.188236 120.470589 102.4-42.164706 48.188236z" fill="#999999" p-id="3575"></path><path d="M837.270588 584.282353c-18.070588 0-30.117647-12.047059-30.117647-30.117647V120.470588H222.870588v433.694118c0 18.070588-12.047059 30.117647-30.117647 30.117647s-30.117647-12.047059-30.117647-30.117647V90.352941c0-18.070588 12.047059-30.117647 30.117647-30.117647h644.517647c18.070588 0 30.117647 12.047059 30.117647 30.117647v463.811765c0 18.070588-12.047059 30.117647-30.117647 30.117647z m-120.470588-198.776471H397.552941c-18.070588 0-30.117647-12.047059-30.117647-30.117647s12.047059-30.117647 30.117647-30.117647h325.270588c18.070588 0 30.117647 12.047059 30.117647 30.117647s-18.070588 30.117647-36.141176 30.117647zM451.764706 265.035294H307.2c-18.070588 0-30.117647-12.047059-30.117647-30.117647s12.047059-30.117647 30.117647-30.117647H451.764706c18.070588 0 30.117647 12.047059 30.117647 30.117647s-12.047059 30.117647-30.117647 30.117647z" fill="#999999" p-id="3576"></path><path d="M951.717647 999.905882H72.282353c-18.070588 0-30.117647-12.047059-30.117647-30.117647V469.835294v-12.047059c0-6.023529 0-6.023529 6.023529-6.023529 0-6.023529 6.023529-6.023529 12.047059-6.02353s6.023529-6.023529 12.047059-6.023529h12.047059c6.023529 0 6.023529 0 6.023529 6.023529l289.129412 204.8c12.047059 12.047059 18.070588 30.117647 6.023529 42.164706s-30.117647 18.070588-42.164706 6.02353l-240.941176-168.658824v409.6h819.2V530.070588l-246.964706 168.658824c-12.047059 12.047059-30.117647 6.023529-42.164706-6.02353-12.047059-12.047059-6.023529-30.117647 6.02353-42.164706L933.647059 445.741176l6.023529-6.023529h12.047059c6.023529 0 6.023529 0 12.047059 6.023529s6.023529 6.023529 12.047059 6.02353c0 6.023529 6.023529 6.023529 6.023529 12.047059v505.97647c0 18.070588-12.047059 30.117647-30.117647 30.117647z" fill="#999999" p-id="3577"></path><path d="M951.717647 999.905882c-6.023529 0-18.070588 0-24.094118-6.023529l-307.2-307.2c-18.070588-24.094118-60.235294-42.164706-108.423529-42.164706s-90.352941 12.047059-114.447059 36.141177L90.352941 987.858824c-12.047059 12.047059-30.117647 12.047059-42.164706 0-12.047059-12.047059-12.047059-30.117647 0-42.164706l307.2-307.2c36.141176-30.117647 90.352941-54.211765 156.611765-54.211765s120.470588 18.070588 156.611765 54.211765l307.2 307.2c12.047059 12.047059 12.047059 30.117647 0 42.164706-6.023529 6.023529-12.047059 12.047059-24.094118 12.047058z" fill="#999999" p-id="3578"></path></svg>
        </span>
        {{text}}
      </a>
      <a v-else href="javascript:;">
        <a-icon class="icon" type="mail" />
        {{text}}
      </a>
    </template>
    <a-tag slot="type" slot-scope="text" :color="text ? mapTypeColor[text] : ''">
      {{mapType[text]}}
    </a-tag>
  </a-table>
</template>

<script>
import { getSitemail, deleteSitemail, setSitemail } from '@/utils/api';
import findIndex from 'lodash/findIndex';

const columns = [
  {
    title: '消息内容',
    dataIndex: 'title',
    scopedSlots: { customRender: 'msgTitle' },
  },
  {
    title: '日期',
    dataIndex: 'createTime',
  },
  {
    title: '消息类型',
    dataIndex: 'type',
    scopedSlots: { customRender: 'type' },
  },
];
const mapType = {
  'warning': '警告',
  'info': '站内信',
  'danger': '错误',
  'success': '成功通知',
  'message': '互动通知',
  '': '其它'
};
const mapTypeColor = {
  'warning': 'orange',
  'info': 'blue',
  'danger': 'red',
  'success': 'blue',
  'message': 'cyan'
};

let listDataStatic = {};

export default {
  mounted() {
    this.getSitemail();
  },
  data(){
    return{
      selectedRowKeys: [],
      seleted: [],
      listData: {
        list: []
      },
      columns,
      mapType,
      mapTypeColor,
      isReadChecked: false
    }
  },
  computed: {
    hasSelected(){
      return this.seleted.length > 0;
    },
    data(){
      return this.listData.list || [];
    },
    rowSelection() {
      const _this = this;
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          _this.seleted = selectedRows;
          _this.selectedRowKeys = selectedRowKeys;
        },
        selectedRowKeys: this.selectedRowKeys
      };
    }
  },
  methods: {
    async getSitemail(){
      const res = await getSitemail()

      if(res.data && res.data.code === 20000){
        const sitemail = res.data.data;
        this.listData = sitemail;
        listDataStatic = {...sitemail};
        this.$emit('rowsChange');
      }
    },
    async deleteRows(){
      const IDs = this.seleted.map(v=>v._id);
      var res = await deleteSitemail({body: {IDs}})
      if(res.data && res.data.code === 20000){
        const len = IDs.length;
        if(len > 0) {
          IDs.forEach(v=>{
            const index = findIndex(this.listData.list, ['_id', v]);
            this.listData.list.splice(index, 1);
          })
          this.$message.success('删除成功');
          this.listData.noReadCount -= this.seleted.filter(v => !v.isRead).length;
          this.listData.count -= len;
          this.seleted = [];
          this.selectedRowKeys = [];
          this.$emit('rowsChange');
        }
      }
    },
    async remarkRead(isAll){
      if(this.listData.noReadCount === 0) return false;

      let data = {
        isRead: true
      };
      let res;

      if(!isAll) data.ids = this.seleted.map(v=>v._id);
      res = await setSitemail({ body: {data} });
      if(res.data && res.data.code === 20000){
        if(isAll){
          this.listData.list.forEach(v=>{
            if(!v.isRead) v.isRead = true;
          })
          this.listData.noReadCount = 0;
        }else{
          this.listData.noReadCount -= this.seleted.filter(v=>!v.isRead).length;
          this.seleted.forEach(v=>{
            v.isRead = true;
          })
          this.seleted = [];
          this.selectedRowKeys = [];
        }
        this.$emit('rowsChange');
      }
    },
    showNoReadOnly(){
      this.isReadChecked = !this.isReadChecked
      if(this.isReadChecked){
        const list = this.sitemail.list.filter(v => !v.isRead);
        this.listData.list = list;
      }else{
        this.listData.list = listDataStatic.list;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.sitemail-table{
  .gray{
    color: #999;
  }
  .icon{
    margin-right: 2px;
    width: 1.2em;
    display: inline-block;
    text-align: center;
  }
  a{
    &:hover{
      text-decoration: underline;
    }
  }
}
</style>