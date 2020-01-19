<template>
  <div>
    <breadcrumb :routes="routes"></breadcrumb>
    <div class="courselist-container">
      <a-form :form="form" layout="inline" class="custom-search-form">
        <a-form-item>
          <a-input class="form-item-ele" v-decorator="['title']" placeholder="课程名称" />
        </a-form-item>
        <a-form-item>
          <a-select class="form-item-ele" placeholder="选择所属类目">
            <a-select-option v-for="v in courseCategory" :key="v._id" :value="v._id">{{ v.name }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item>
          <a-select class="form-item-ele" placeholder="难易程度">
            <a-select-option value="primary">初级</a-select-option>
            <a-select-option value="advanced">进阶</a-select-option>
            <a-select-option value="senior">高级</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item>
          <a-button type="primary">搜素</a-button>
        </a-form-item>
      </a-form>

      <a-row class="items" :gutter="20">
        <a-col :span="6">
          <router-link class="item first" to="/course/add/0">
            <a-icon type="plus" />
            <span>新增课程</span>
          </router-link>
        </a-col>
        <a-col :span="6" v-for="v in courseList" :key="v._id">
          <div class="item">
            <div class="content">
              <div class="left">
                <!-- <a-icon :style="{fontSize: '34px', color: '#00adf7'}" type="alipay-circle" /> -->
                <img :class="v.iconUrl ? '':'is-gray'" :src="v.iconUrl || require('../../assets/img/logo-mini.svg')">
              </div>
              <div class="info">
                <h2>{{v.title}}</h2>
                <p>{{v.description}}</p>
              </div>
            </div>
            <div class="footer">
              <router-link to="/course/add/1">编辑</router-link>
              <div>删除</div>
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex';
export default {
  created(){
    this.form = this.$form.createForm(this);
    this.getCourseCategory();
    this.getCourseList();
  },
  computed: {
    ...mapState({
      courseCategory: state => state.course.category,
      courseList: state => state.course.list
    })
  },
  data(){
    return{
      routes: [
        {
          path: '/',
          breadcrumbName: 'Home',
          multilingual: 'menu.home' // true(boolean) or language file attribute(string)
        },{
          breadcrumbName: '课程列表'
        }
      ]
    }
  },
  methods: {
    ...mapActions({
      getCourseCategory: 'getCategory',
      getCourseList: 'getList'
    })
    // async init(){
    //   const res = await this.$axios.get('/api/category?type=course');
    //   if (res.data && res.data.code === 20000) {
    //     this.courseCategory = res.data.data;
    //   }
    // }
  }
}
</script>

<style lang="scss">
.courselist-container{
  .custom-search-form{
    background: #fff;
    margin: -20px -20px 20px;
    padding: 0 20px 20px;
  }
  .form-item-ele{
    width: 200px;
  }
  .items{
    display: flex;
    flex-wrap: wrap;
  }
  .ant-col-6{
    margin-bottom: 20px;
  }
  .item{
    background: #fff;
    display: flex;
    flex-direction: column;
    height: 100%;
    font-size: 12px;
    line-height: 1.5;
    .content{
      display: flex;
      padding: 20px 20px 0;
      flex: 1 1 auto;
    }
    .left{
      flex: 0 0 56px;
      img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: #eee;
        padding: 4px;
        box-sizing: border-box;
      }
      .is-gray{
        filter: grayscale(1);
        opacity: .5;
        background: #ccc;
      }
    }
    .info{
      flex: 1 1 auto;
      p{
        @include lineover(2);
      }
    }
  }
  .first{
    display: flex;
    align-items: center;
    justify-content: center;
    border: dashed 1px #ddd;
    padding: 20px!important;
    flex-direction: row;
    color: inherit;
    span{
      margin-left: 10px;
    }
    &:hover{
      border-color: $primary-color;
      cursor: pointer;
      color: $link-color;
    }
  }
  .footer{
    display: flex;
    flex: 0 0 40px;
    a, div{
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