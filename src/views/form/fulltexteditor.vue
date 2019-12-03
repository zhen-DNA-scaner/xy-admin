<template>
  <div>
    <breadcrumb :routes="routes"></breadcrumb>
    <div class="fulltext-editor-container">
      <a-form layout="horizontal" :form="form">
        <a-form-item label="标题" v-bind="formItemLayout">
          <a-input placeholder="标题" v-decorator="['title', { rules: [{ required: true, message: '请输入标题' }] }]"/>
        </a-form-item>
        <a-form-item label="正文" v-bind="formItemLayout">
          <full-editor
            :v-model="content">
          </full-editor>
        </a-form-item>
        <a-form-item :wrapper-col="buttonItemLayout.wrapperCol">
          <a-button type="primary" html-type="button">
            保存
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
import fullEditor from '@/components/fulleditor.vue'
export default {
  components: {fullEditor},
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
          breadcrumbName: 'Full Text Editor',
          multilingual: 'menu.fullTextEditor'
        }
      ],
      formItemLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 15 },
      },
      buttonItemLayout: {
        wrapperCol: { span: 12, offset: 4 },
      },
      content: ''
    }
  }
}
</script>

<style lang="scss">
.fulltext-editor-container{
  @include contentPannel;
}
</style>