<template>
  <a-form
    id="components-form-demo-normal-register"
    :form="form"
    class="register-form"
    @submit="handleSubmit"
  >
    <a-form-item>
      <a-alert v-if="message" :message="message" :type="messageType" showIcon closable />
    </a-form-item>
    <a-form-item>
      <a-auto-complete
        v-decorator="[
          'email',
          {rules: [
            { required: true, message: '邮箱不能为空!' },
            { type: 'email', message: '请输入正确的邮箱' }
          ]},
        ]"
        placeholder="邮箱"
        size="large"
        @change="handleEmailChange"
      >
        <template slot="dataSource">
          <a-select-option
            v-for="email in autoCompleteEmail"
            :key="email"
          >
            {{ email }}
          </a-select-option>
        </template>
        <a-input />
        <a-icon
          slot="prefix"
          type="user"
          style="color: rgba(0,0,0,.25)"
        />
      </a-auto-complete>
    </a-form-item>
    <a-form-item>
      <a-input
        v-decorator="[
          'password2',
          { rules: [{ required: true, message: '密码不能为空!' }] }
        ]"
        type="password"
        placeholder="密码"
        size="large"
      >
        <a-icon
          slot="prefix"
          type="lock"
          style="color: rgba(0,0,0,.25)"
        />
      </a-input>
    </a-form-item>
    <a-form-item>
      <captcha @getCaptcha="getCaptcha" size="large">
        <a-input
          v-decorator="[
            'captcha',
            {rules: [{ required: true, message: '请输入验证码' }]}
          ]"
          placeholder="验证码"
          size="large"
        >
          <a-icon
            slot="prefix"
            type="code"
            style="color: rgba(0,0,0,.25)"
          />
        </a-input>
      </captcha>
    </a-form-item>
    <a-form-item>
      <a-button
        type="primary"
        html-type="submit"
        class="register-form-button"
        size="large"
        :loading="loading"
      >
        注册
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
  import { getCaptcha, register } from '@/utils/api';
  import captcha from '@/components/display/captcha';
  export default {
    components: {
      captcha
    },
    beforeCreate () {
      this.form = this.$form.createForm(this);
    },
    data () {
      return {
        message: '',
        messageType: '',
        loading: false,
        autoCompleteEmail: []
      }
    },
    methods: {
      handleSubmit (e) {
        e.preventDefault();

        if (this.message) this.message = '';
        this.form.validateFields(async (err, values) => {
          if (!err) {
            this.loading = 'loading';
            const res = await register({ body: values });
            if(res.data.errMsg) {
              this.messageType = 'error';
              this.message = res.data.errMsg;
            }
            if(res.data.code === 20000) {
              this.messageType = 'success';
              this.message = '已注册，管理员通过后将会邮件通知!';
              this.form.resetFields(['password2', 'captcha']);
            }
            this.loading = false;
          }
        });
      },
      async getCaptcha (captchaCountdown) {
        this.form.validateFields(['email'], async (err, values) => {
          if(!err){
            if(!this.form.getFieldsValue().email) return false;
            const res = await getCaptcha({ body: { email: values.email } });
            if (res.data && res.data.code === 20000)
              // 开始倒计时
              captchaCountdown();
          }
        })
      },
      handleEmailChange(value){
        let autoCompleteEmail;
        if (!value) {
          autoCompleteEmail = [];
        } else {
          const emailTypes = ['@qq.com', '@163.com', '@126.com'];
          autoCompleteEmail = emailTypes.map(email => `${value}${email}`);
        }
        this.autoCompleteEmail = autoCompleteEmail;
      }
    },
  };
</script>

<style lang="scss">
  #components-form-demo-normal-register .register-form {
    max-width: 300px;
  }
  #components-form-demo-normal-register .register-form-forgot {
    float: right;
  }
  #components-form-demo-normal-register .register-form-button {
    width: 100%;
    margin-top: 20px;
  }
</style>