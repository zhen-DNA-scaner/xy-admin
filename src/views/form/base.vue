<template>
  <div>
    <breadcrumb :routes="routes" tips="基础表单常见于数据项较少的表单场景。"></breadcrumb>
    <div class="form-base-content">
      <a-form layout="horizontal" :form="form">
        <a-form-item label="标题" v-bind="formItemLayout">
          <a-input placeholder="标题" v-decorator="['title', { rules: [{ required: true, message: '请输入标题' }] }]"/>
        </a-form-item>
        <a-form-item label="所属类目" v-bind="formItemLayout">
          <a-select placeholder="请选择类目" v-decorator="['category', { rules: [{ required: true, message: '请选择类目' }] }]">
            <a-select-option value="jack">Jack</a-select-option>
            <a-select-option value="lucy">Lucy</a-select-option>
            <a-select-option value="tom">Tom</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="权重" v-bind="formItemLayout">
          <a-input-number v-decorator="['weight']"  :min="0" :max="100" :style="{marginRight: '10px'}" />%
        </a-form-item>
        <a-form-item label="描述" v-bind="formItemLayout">
          <a-textarea placeholder="描述" :rows="4" />
        </a-form-item>
        <a-form-item label="略缩图" v-bind="formItemLayout">
          <a-upload-dragger
            class="poster-upload-item"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-card"
            :showUploadList="false"
            :beforeUpload="beforeUpload"
            @change="handleChange"
          >
            <img v-if="posterUrl" :src="posterUrl" />
            <div v-else>
              <a-icon :type="posterLoading ? 'loading' : 'plus'" />
              <div class="ant-upload-text">上传</div>
            </div>
          </a-upload-dragger>
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="目标公开">
          <a-radio-group v-decorator="['radio-group']">
            <a-radio value="a">
              公开
            </a-radio>
            <a-radio value="b">
              不公开
            </a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item :wrapper-col="buttonItemLayout.wrapperCol">
          <a-button type="primary" html-type="button" @click="handleSubmit" :loading="loading">
            保存
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
import { formItemLayout, buttonItemLayout } from './form-layout';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

export default {
  created(){
    this.form = this.$form.createForm(this);
  },
  data(){
    return{
      routes: [
        {
          path: '/',
          breadcrumbName: 'Home',
          multilingual: 'menu.home' // true(boolean) or language file attribute(string)
        },{
          breadcrumbName: 'Base Form',
          multilingual: 'menu.formbase'
        }
      ],
      loading: false,
      posterUrl: '',
      posterLoading: false
    }
  },
  computed: {
    formItemLayout,
    buttonItemLayout,
  },
  methods: {
    handleSubmit(){

    },
    handleChange(info) {
      if (info.file.status === 'uploading') {
        this.loading = true;
        return;
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, imageUrl => {
          this.imageUrl = imageUrl;
          this.loading = false;
        });
      }
    },
    beforeUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      if (!isJPG) {
        this.$message.error('You can only upload JPG file!');
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('Image must smaller than 2MB!');
      }
      return isJPG && isLt2M;
    },
  }
}
</script>

<style lang="scss">
.form-base-content{
  @include contentPannel;
  .poster-upload-item {
    & > .ant-upload, span.ant-upload {
      width: 100px;
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>