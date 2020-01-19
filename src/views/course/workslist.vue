<template>
  <div>
    <breadcrumb :routes="routes"></breadcrumb>
    <div class="workslist-container">
      <a-form :form="form" layout="inline" class="custom-search-form">
        <a-form-item>
          <a-input class="form-item-ele" v-decorator="['title']" placeholder="作品名称" />
        </a-form-item>
        <a-form-item>
          <a-select class="form-item-ele" placeholder="选择所属类目">
            <a-select-option value="jack">VI品牌设计</a-select-option>
            <a-select-option value="lucy">UI设计</a-select-option>
            <a-select-option value="disabled" disabled>插画设计</a-select-option>
            <a-select-option value="Yiminghe">动效设计</a-select-option>
            <a-select-option value="web">H5前端开发</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item>
          <a-button type="primary">搜素</a-button>
        </a-form-item>
      </a-form>

      <a-row class="works-waterfall" :gutter="20">
        <a-col :span="6" v-for="(col, coli) in list" :key="coli">
          <div v-if="coli === 0" class="item first" ref="firstItem">
            <a-icon type="plus" />
            <span>新增素材</span>
          </div>
          <div v-for="item in col.data" :key="item._id" class="item">
            <div class="img-wraper" :style="{height: item.height + 'px'}"></div>
            <div class="title">{{ item.title }}</div>
            <div class="footer">
              <div>编辑</div>
              <div>删除</div>
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import { Random, minWithKey } from '@/utils/math'

const data = [];
const randomTitle = ['AI练习插画', 'Photoshop手电筒精修', 'PS人物磨皮', 'PS精美海报', 'Sketch外卖UI设计', 'APP整套UI素材'];
const random = Random.int;
for(let i = 0; i < 50; i++){
  data.push({
    _id: i,
    src: '',
    title: randomTitle[random(0, randomTitle.length - 1)],
    width: random(200, 400),
    height: random(180, 500)
  })
}

export default {
  created(){
    this.form = this.$form.createForm(this);
  },
  mounted() {
    this.init();
  },
  data(){
    return{
      routes: [
        {
          path: '/',
          breadcrumbName: 'Home',
          multilingual: 'menu.home' // true(boolean) or language file attribute(string)
        },{
          breadcrumbName: '素材列表'
        }
      ],
      list: [
        {
          cumulativeHeight: 180,
          data: []
        },{
          cumulativeHeight: 0,
          data: []
        },{
          cumulativeHeight: 0,
          data: []
        },{
          cumulativeHeight: 0,
          data: []
        },
      ]
    }
  },
  methods: {
    init(){
      const firstItemWidth = this.$refs.firstItem[0].offsetWidth - 20;
      for(let v of data){
        const heightArr = this.list.map(v => v.cumulativeHeight);
        const key = minWithKey(heightArr).key;
        const scale = Math.round(firstItemWidth / v.width * 10) / 10;
        this.list[key].cumulativeHeight += v.height * scale;
        this.list[key].data.push(v);
      }
    }
  }
}
</script>

<style lang="scss">
.workslist-container{
  .custom-search-form{
    background: #fff;
    margin: -20px -20px 20px;
    padding: 0 20px 20px;
  }
  .form-item-ele{
    width: 200px;
  }
  .ant-col-4{
    margin-bottom: 20px;
  }
  .item{
    background: #fff;
    display: flex;
    flex-direction: column;
    height: 100%;
    font-size: 13px;
    line-height: 1.5;
    margin-bottom: 20px;
    .img-wraper{
      background: #e5e5e5;
    }
    .title{
      padding: 12px;
    }
  }
  .first{
    display: flex;
    align-items: center;
    justify-content: center;
    border: dashed 1px #ddd;
    padding: 20px!important;
    flex-direction: row;
    margin-bottom: 20px;
    height: 180px;
    span{
      margin-left: 10px;
    }
    &:hover{
      border-color: $primary-color;
      cursor: pointer;
    }
  }
  .footer{
    display: flex;
    flex: 0 0 40px;
    div{
      flex: 1;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f9f9f9;
      color: #999;
      &:hover{
        color: $primary-color;
        cursor: pointer;
      }
    }
  }
}
</style>