<template>
  <div>
    <breadcrumb :routes="routes"></breadcrumb>
    <div class="account-security-phone-content">
      <a-steps class="a-steps-custom" :current="currentStep" size="small">
        <a-step title="验证旧邮箱" />
        <a-step title="填写新邮箱" />
        <a-step title="完成" />
      </a-steps>
      <a-form v-if="currentStep < 2" layout="horizontal" :form="form">
        <div v-show="currentStep === 0">
          <a-form-item
            label="邮箱"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-input
              placeholder="邮箱"
              v-decorator="['email']"
              :disabled="true"
            />
          </a-form-item>
          <a-form-item
            label="验证码"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <captcha @getCaptcha="sendCaptcha">
              <a-input
                v-decorator="[
                  'captcha',
                  {rules: [{ required: true, message: '请输入验证码' }]}
                ]"
                placeholder="验证码"
                @change="e => btnDisabled = !e.target.value"
              />
            </captcha>
          </a-form-item>
        </div>

        <div v-show="currentStep === 1">
          <a-form-item
            label="新邮箱"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-input
              placeholder="新邮箱"
              v-decorator="[
                'newEmail',
                {rules: [
                  { required: true, message: '邮箱不能为空' },
                  { type: 'email', message: '请输入正确的邮箱' }
                ]}
              ]"
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
                  'newEmailCaptcha',
                  {rules: [{ required: true, message: '请输入验证码' }]}
                ]"
                placeholder="验证码"
              />
            </captcha>
          </a-form-item>
        </div>

        <a-form-item
          :wrapper-col="buttonItemLayout.wrapperCol"
        >
          <a-button type="primary" html-type="button" @click="submitHandle" :disabled="btnDisabled" :loading="btnLoading">
            {{btnTxt}}
          </a-button>
          <a-button v-show="currentStep===1" :style="{marginLeft: '20px'}" @click="() => currentStep--">上一步</a-button>
        </a-form-item>
      </a-form>

      <div v-else class="success-block">
        <div><span class="icon-wraper"><a-icon type="check" :style="{color: '#fff', fontSize: '1em'}" /></span></div>
        <h2>修改成功</h2>
        <router-link to="/account/setting">返回个人设置</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { formItemLayout, buttonItemLayout } from './form-layout';
import captcha from '@/components/display/captcha';
import { sendCaptcha, validateCaptcha, getCaptcha, setUserEmail } from '@/utils/api';
export default {
  components: { captcha },
  created () {
    this.form = this.$form.createForm(this);
  },
  mounted(){
    this.$nextTick(()=>{
      this.form.setFieldsValue({email: this.user.email});
    })
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
      currentStep: 0,
      btnDisabled: true,
      btnLoading: false
    }
  },
  computed: {
    formItemLayout,
    buttonItemLayout,
    btnTxt(){
      return this.currentStep < 2 ? '下一步' : '完成';
    },
    user(){
      let user = this.$store.getters && this.$store.getters.user;
      if (!user) user = this.$storage.get('user') || {};
      return user;
    },
  },
  methods: {
    async submitHandle(){
      this.btnLoading = true;
      switch(this.currentStep){
        case 0:
          var { captcha } = this.form.getFieldsValue();
          var res = await validateCaptcha({body: {captcha}});
          if(res.data && res.data.code === 20000)
            this.currentStep++;
          else
            this.$message.error('验证码错误');
          break;
        case 1:
          this.form.validateFields(['captcha', 'newEmail', 'newEmailCaptcha'], async (err, values) => {
            if(!err){
              const res = await setUserEmail({body: values});
              if(res.data && res.data.code === 20000)
                this.$store.commit('setUser', {email: values.newEmail});
                this.currentStep++;
            }
          })
          break;
        default:
          break;
      }
      this.btnLoading = false;
    },
    async sendCaptcha (captchaCountdown) {
      const res = await sendCaptcha({params: '/email'});
      if(res.data && res.data.code === 20000)
        captchaCountdown();
    },
    async getCaptcha(captchaCountdown) {
      this.form.validateFields(['newEmail'], async (err, values) => {
        if(!err){
          const res = await getCaptcha({body: {email: values.newEmail}});
          if(res.data && res.data.code === 20000)
            captchaCountdown();
        }
      })
    }
  }
}
</script>

<style lang="scss">
.account-security-phone-content{
  @include contentPannel;
  .a-steps-custom{
    padding: 30px 28% 50px;
  }
  .success-block{
    text-align: center;
    .icon-wraper{
      display: inline-flex;
      font-size: 30px;
      width: 2em;
      height: 2em;
      background: $success-color;
      border-radius: 50%;
      align-items: center;
      justify-content: center;
      margin: 20px;
    }
    h2{
      font-size: 30px;
      margin: 0 0 40px;
    }
  }
}
</style>