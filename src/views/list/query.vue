<template>
  <div>
    <breadcrumb :routes="routes"></breadcrumb>
    <div class="list-query-container">
      <a-form :form="form">
        <a-row :gutter="20">
          <a-col :span="8">
            <a-form-item label="标题" v-bind="formLayout">
              <a-input />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="所属类目" v-bind="formLayout">
              <a-select defaultValue="lucy">
                <a-select-option value="jack">Jack</a-select-option>
                <a-select-option value="lucy">Lucy</a-select-option>
                <a-select-option value="disabled" disabled>Disabled</a-select-option>
                <a-select-option value="Yiminghe">yiminghe</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="发布时间" v-bind="formLayout">
              <a-range-picker />
            </a-form-item>
          </a-col>
        </a-row>
        
        <a-row>
          <a-col :span="24" :style="{ textAlign: 'right' }">
            <a-button type="primary" html-type="submit">
              搜索
            </a-button>
            <a-button :style="{ marginLeft: '8px' }" @click="handleReset">
              重置
            </a-button>
          </a-col>
        </a-row>
      </a-form>

      <div>
        <!-- 表格按钮 -->
        <div class="new-btn-wraper">
          <a-button type="primary">
            <a-icon type="plus" />新建
          </a-button>
          <a-dropdown v-show="hasSelected">
            <a-menu slot="overlay">
              <a-menu-item key="1">删除</a-menu-item>
              <a-menu-item key="2">审核通过</a-menu-item>
            </a-menu>
            <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /> </a-button>
          </a-dropdown>
          <span v-if="hasSelected" style="margin-left: 8px">
            <template>
              {{`已选中 ${selectedRowKeys.length} 项`}}
            </template>
          </span>
        </div>

        <!-- 表格 -->
        <a-table
          :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
          :columns="columns"
          :dataSource="data"
        />
      </div>
    </div>
  </div>
</template>

<script>
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];

const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}

export default {
  created(){
    this.form = this.$form.createForm(this)
  },
  data(){
    return{
      routes: [
        {
          path: '/',
          breadcrumbName: 'Home',
          multilingual: 'menu.home' // true(boolean) or language file attribute(string)
        },{
          breadcrumbName: 'List',
          multilingual: 'menu.querytable'
        }
      ],
      formLayout: {
        labelCol: { span: 5 },
        wrapperCol: { span: 19 },
      },
      data,
      columns,
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
    }
  },
  computed: {
    hasSelected() {
      return this.selectedRowKeys.length > 0;
    },
  },
  methods: {
    start() {
      this.loading = true;
      // ajax request after empty completing
      setTimeout(() => {
        this.loading = false;
        this.selectedRowKeys = [];
      }, 1000);
    },
    onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    },
  },
}
</script>

<style lang="scss" scoped>
.list-query-container{
  @include contentPannel;
  .new-btn-wraper{
    margin-bottom: 20px;
  }
}
</style>