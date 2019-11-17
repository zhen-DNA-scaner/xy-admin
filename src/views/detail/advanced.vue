<template>
  <div>
    <breadcrumb :routes="routes"></breadcrumb>
    <div class="detail-advanced-container">
      <h2>退款申请</h2>
      <a-row :gutter="20">
        <a-col :span="8">
          取货单号: 1000000000
        </a-col>
        <a-col :span="8">
          状态: 已取货
        </a-col>
        <a-col :span="8">
          销售单号: 1234123421
        </a-col>
        <a-col :span="8">
          子订单: 3214321432
        </a-col>
      </a-row>
      <a-divider />
      <h2>用户信息</h2>
      <a-row :gutter="20">
        <a-col :span="8">
          用户姓名: 付小小
        </a-col>
        <a-col :span="8">
          联系电话: 18100000000
        </a-col>
        <a-col :span="8">
          常用快递: 菜鸟仓储
        </a-col>
        <a-col :span="8">
          取货地址: 浙江省杭州市西湖区万塘路18号
        </a-col>
        <a-col :span="8">
          备注: 无
        </a-col>
      </a-row>
      <a-divider />
      <h2>退货商品</h2>
      <a-table
        :columns="columns"
        :dataSource="data"
        :pagination="false"
      >
        <template slot="footer">
          <div class="total-price">
            总计: <b>{{total}}</b>元
          </div>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
const columns = [
  {
    title: '订单号',
    dataIndex: 'orderCode'
  },
  {
    title: '商品',
    dataIndex: 'title'
  },
  {
    title: '单价（元）',
    dataIndex: 'price',
  },
  {
    title: '数量（件）',
    dataIndex: 'count',
  },
  {
    title: '金额（元）',
    dataIndex: 'priceTotal',
    width: '15%'
  },
];
export default {
  data(){
    return{
      routes: [
        {
          path: '/',
          breadcrumbName: 'Home',
          multilingual: 'menu.home' // true(boolean) or language file attribute(string)
        },{
          breadcrumbName: 'Senior',
          multilingual: 'menu.detailsenior'
        }
      ],
      columns,
      data: [{
        orderCode: '1234561',
        title: '矿泉水 550ml',
        price: 2.00,
        count: 1,
        priceTotal: 2.00
      }]
    }
  },
  computed: {
    total(){
      let price = 0;
      this.data.forEach(v => price += v.price);
      return price;
    }
  }
}
</script>

<style lang="scss">
.detail-advanced-container{
  @include contentPannel;
  h2{
    font-size: 18px;
  }
  .ant-col-8{
    margin: 10px 0;
  }
  .total-price{
    display: flex;
    justify-content: flex-end;
    b{
      margin-left: 10px;
    }
  }
}
</style>