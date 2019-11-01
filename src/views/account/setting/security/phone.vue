<template>
  <div>
    <breadcrumb :routes="routes"></breadcrumb>
    <div class="account-security-phone-content">
      <a-form layout="horizontal" :form="form">
        <a-form-item
          label="手机号"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <a-input-password
            placeholder="手机号"
            v-decorator="['phone', { rules: [
              { required: true, message: '请输入手机号' },
              { validator: validatePhone }
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
            保存
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
          multilingual: 'menu.home' // true(boolean) or language file attribute(string)
        },{
          path: '/account/setting',
          breadcrumbName: 'setting',
          multilingual: 'menu.accountpassword'
        },{
          breadcrumbName: 'phone',
          multilingual: 'menu.accountphone'
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
      this.form.validateFields(['phone'], async (err, values) => {
        if(!err){
          if(!this.form.getFieldsValue().phone) return false;
          const res = await getCaptcha({ body: { phone: values.phone } });
          console.log(res)
          captchaCountdown();
        }
      })
    },
    validatePhone: debounce(function(rule, value, callback){
      if (value && !validate('phone', value)) {
        callback('请输入正确的手机号');
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