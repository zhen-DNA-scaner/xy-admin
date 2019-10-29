<template>
  <div>
    <breadcrumb :routes="routes"></breadcrumb>
    <div class="account-security-phone-content">
      <a-form layout="horizontal" :form="form">
        <a-form-item
          label="邮箱"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <a-input-password
            placeholder="邮箱"
            v-decorator="['email', { rules: [
              { required: true, message: '请输入邮箱' },
              { validator: validateEmail }
            ]}]"
          />
        </a-form-item>
        <a-form-item
          label="验证码"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <captcha @getCaptcha="getCaptcha">
            <a-input
              v-decorator="[
                'captcha',
                {rules: [{ required: true, message: '请输入验证码' }]}
              ]"
              placeholder="验证码"
            />
          </captcha>
        </a-form-item>
        <a-form-item
          :wrapper-col="buttonItemLayout.wrapperCol"
        >
          <a-button type="primary" html-type="submit">
            绑定/修改
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
import { formItemLayout, buttonItemLayout } from './form-layout';
import captcha from '@/components/display/captcha';
import { getCaptcha } from '@/utils/api';
import { validate } from '@/utils/validator';
import debounce from 'lodash/debounce';
export default {
  components: { captcha },
  beforeCreate () {
    this.form = this.$form.createForm(this);
  },
  data(){
    return{
      routes: [
        {
          path: '/',
          breadcrumbName: 'home',
        },{
          path: '/account/setting',
          breadcrumbName: 'personalsetting',
        },{
          breadcrumbName: 'accountemail'
        }
      ],
      captchaText: '',
      captchaDisabled: false,
    }
  },
  computed: {
    formItemLayout,
    buttonItemLayout,
  },
  methods: {
    getCaptcha (captchaCountdown) {
      this.form.validateFields(['email'], async (err, values) => {
        if(!err){
          if(!this.form.getFieldsValue().email) return false;
          const res = await getCaptcha({ body: { email: values.email } });
          console.log(res)
          captchaCountdown();
        }
      })
    },
    validateEmail: debounce(function(rule, value, callback){
      if (value && !validate('email', value)) {
        callback('请输入正确的邮箱');
      } else {
        callback();
      }
    }, 1000, { leading: true })
  }
}
</script>

<style lang="scss">
.account-security-phone-content{
  background: #fff;
  padding: 30px;
}
</style>