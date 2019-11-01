<template>
  <a-table
    class="message-table"
    :rowSelection="rowSelection"
    :columns="columns"
    :dataSource="data"
    rowKey="_id"
    :pagination="{
      total: +listData.list.length,
      defaultPageSize: 15
    }"
  >
    <a slot="content" slot-scope="text, record" href="javascript:;" class="content-wraper">
      <a-badge :dot="!record.isRead"><a-avatar class="avatar" :src="record.user.avatarUrl"/></a-badge>
      <div>
        <h4>{{record.user.nickName}} {{record.type === 'reply' ? '回复了你' : '评论了你'}}</h4>
        <p>{{text}}</p>
      </div>
    </a>
    <a-tag slot="type" slot-scope="text" :color="text ? mapTypeColor[text] : ''">
      {{mapType[text]}}
    </a-tag>
  </a-table>
</template>

<script>
import { getMessage, deleteMessage, setMessage } from '@/utils/api';
import findIndex from 'lodash/findIndex';

const columns = [
  {
    title: '消息内容',
    dataIndex: 'content',
    scopedSlots: { customRender: 'content' },
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
  'reply': '回复',
  'comment': '评论',
  '': '其它'
};
const mapTypeColor = {
  'reply': 'blue',
  'comment': 'red'
};

let listDataStatic = {};

export default {
  mounted() {
    this.getMessage();
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
    async getMessage(){
      const res = await getMessage()

      if(res.data && res.data.code === 20000){
        const list = res.data.data;
        this.listData = list;
        listDataStatic = {...list};
        this.$emit('rowsChange');
      }
    },
    async deleteRows(){
      const IDs = this.seleted.map(v=>v._id);
      var res = await deleteMessage({body: {IDs}})
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
      res = await setMessage({ body: {data} });
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

<style lang="scss">
.message-table{
  .content-wraper{
    display: flex;
    align-items: center;
    P, h4{
      margin: 0 0 0 10px;
    }
    h4{
      color: #999;
      font-size: 12px;
    }
    p{
      @include lineover;
      color: initial;
    }
    .ant-avatar{
      flex: 0 0 auto;
    }
  }
}
</style>