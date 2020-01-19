<template>
  <div>
    <breadcrumb :routes="routes" tips="基础表单常见于数据项较少的表单场景。"></breadcrumb>
    <div class="form-base-content">
      <a-form layout="horizontal" :form="form">
        <a-form-item label="标题" v-bind="formItemLayout">
          <a-input placeholder="标题" v-decorator="['title', { rules: [{ required: true, message: '请输入标题' }] }]"/>
        </a-form-item>
        <a-form-item label="所属类目" v-bind="formItemLayout">
          <a-row :gutter="20">
            <a-col :span="12">
              <a-select placeholder="请选择类目" v-decorator="['category', { rules: [{ required: true, message: '请选择类目' }] }]">
                <a-select-option v-for="v in courseCategory" :key="v._id" :value="v._id">{{ v.name }}</a-select-option>
              </a-select>
            </a-col>
            <!-- <a-col :span="6">
              <a-button type="primary">创建类目</a-button>
            </a-col> -->
          </a-row>
        </a-form-item>
        <a-form-item label="课程等级" v-bind="formItemLayout">
          <a-row :gutter="20">
            <a-col :span="12">
              <a-select placeholder="课程难易程度" v-decorator="['level', {rules: [{required: true, message: '请选择等级'}]}]">
                <a-select-option value="primary">入门</a-select-option>
                <a-select-option value="advanced">进阶</a-select-option>
                <a-select-option value="senior">高级</a-select-option>
              </a-select>
            </a-col>
          </a-row>
        </a-form-item>
        <a-form-item label="课程介绍" v-bind="formItemLayout">
          <a-textarea v-decorator="['description']" placeholder="主要介绍课程可以学到什么、可以运用于哪方面的生活或工作" :rows="4" />
        </a-form-item>
        <a-form-item label="课程封面" v-bind="formItemLayout">
          <a-upload-dragger
            class="poster-upload-item"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-card"
            :showUploadList="false"
            :beforeUpload="beforeUpload"
            @change="handlePosterChange"
          >
            <img v-if="posterUrl" :src="posterUrl" />
            <div v-else>
              <a-icon :type="posterLoading ? 'loading' : 'plus'" />
              <div class="ant-upload-text">上传</div>
            </div>
          </a-upload-dragger>
          <a-tooltip placement="right">
            <a-icon type="question-circle" :style="questionIconStyles" />
            <template slot="title">
              建议尺寸：400x340px
            </template>
          </a-tooltip>
        </a-form-item>
        <a-form-item label="课程图标" v-bind="formItemLayout">
          <a-upload-dragger
            class="poster-upload-item"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-card"
            :showUploadList="false"
            :beforeUpload="beforeUpload"
            @change="handleIconChange"
          >
            <img v-if="iconUrl" :src="iconUrl" />
            <div v-else>
              <a-icon :type="iconLoading ? 'loading' : 'plus'" />
              <div class="ant-upload-text">上传</div>
            </div>
          </a-upload-dragger>
          <a-tooltip placement="right">
            <a-icon type="question-circle" :style="questionIconStyles" />
            <template slot="title">
              建议尺寸：80x80px
            </template>
          </a-tooltip>
        </a-form-item>
        <a-form-item label="更新状态" v-bind="formItemLayout">
          <a-row :gutter="20">
            <a-col :span="12">
              <a-select placeholder="请选择更新状态，默认状态为：更新中" v-decorator="['status']">
                <a-select-option value="updating">更新中</a-select-option>
                <a-select-option value="updated">完结</a-select-option>
                <a-select-option value="pause">暂停更新</a-select-option>
              </a-select>
            </a-col>
          </a-row>
        </a-form-item>
        <a-form-item label="权重" v-bind="formItemLayout">
          <a-input-number v-decorator="['weight']"  :min="0" :max="100" :style="{marginRight: '10px'}" />%
          <a-tooltip placement="right">
            <a-icon type="question-circle" :style="questionIconStyles" />
            <template slot="title">
              百分比值越高，排序越靠前
            </template>
          </a-tooltip>
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="公开课程">
          <a-radio-group v-decorator="['isOpen']">
            <a-radio :value="true">
              公开
            </a-radio>
            <a-radio :value="false">
              不公开
            </a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item :wrapper-col="buttonItemLayout.wrapperCol">
          <a-button type="primary" html-type="button" @click="handleSubmit" :loading="btnLoading">
            保存
          </a-button>
          <a-button @click="()=>$router.go(-1)" :style="{marginLeft: '20px'}">取消</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
import { formItemLayout, buttonItemLayout } from './form-layout';
import {mapState, mapActions} from 'vuex';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

export default {
  created(){
    this.form = this.$form.createForm(this);
    this.getCourseCategory();
  },
  mounted() {
    if(this.isEditable) this.routes[2].breadcrumbName = '编辑课程';
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
          path: '/course/courselist',
          breadcrumbName: '课程列表'
        },{
          breadcrumbName: '添加课程'
        }
      ],
      btnLoading: false,
      posterUrl: '',
      posterLoading: false,
      iconUrl: '',
      iconLoading: false,
      questionIconStyles: {color: '#ccc', fontSize: '16px', marginLeft: '10px'}
    }
  },
  computed: {
    ...mapState({
      courseCategory: state => state.course.category
    }),
    formItemLayout,
    buttonItemLayout,
    isEditable(){
      return this.$route.params.id != 0;
    }
  },
  methods: {
    init(){
      this.form.setFieldsValue({
        weight: 100,
        description: '本课程主要面向XXX人群，通过XXX老师的讲解，学生将掌握XXX的能力，从而在生活或工作中更好地解决XXX问题。',
        isOpen: true,
        status: 'updating'
      });
    },
    ...mapActions({
      getCourseCategory: 'getCategory' 
    }),
    handleSubmit(e){
      e.preventDefault();
      this.form.validateFields(async (err, values) => {
        if (!err) {
          // values = Object.assign(values, {
          //   posterUrl: this.posterUrl,
          //   iconUrl: this.iconUrl
          // })
          // console.log('Received values of form: ', values);
          this.btnLoading = true;
          const res = await this.$axios.post('/api/course', values).catch(err=>{
            this.btnLoading = false
            if(`${err}`.indexOf('status code 500') >-1){
              this.$message.error('服务器出错！')
            }
          });
          if(res && res.data && res.data.code === 20000){
            this.$message.success('添加成功');
            setTimeout(()=>{
              this.$router.go(-1);
            }, 1000);
          }else{
            this.$message.error(res.data.errMsg);
          }
          this.btnLoading = false;
        }
      });
    },
    // 上传文件改变
    handlePosterChange(info) {
      if (info.file.status === 'uploading') {
        this.posterLoading = true;
        return;
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, imageUrl => {
          this.posterUrl = imageUrl;
          this.posterLoading = false;
        });
      }
    },
    // 上传文件改变
    handleIconChange(info) {
      if (info.file.status === 'uploading') {
        this.iconLoading = true;
        return;
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, imageUrl => {
          this.iconUrl = imageUrl;
          this.iconLoading = false;
        });
      }
    },
    beforeUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      if (!isJPG) {
        this.$message.error('仅支持上传JPG图片格式');
      }
      const isLt1M = file.size / 1024 / 1024 < 1;
      if (!isLt1M) {
        this.$message.error('图片大小不能大于1MB!');
      }
      return isJPG && isLt1M;
    },
  }
}
</script>

<style lang="scss">
.form-base-content{
  @include contentPannel;
  .poster-upload-item {
    display: inline-block;
    & > .ant-upload, span.ant-upload {
      width: 100px;
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    img{
      max-width: 100%;
    }
  }
}
</style>