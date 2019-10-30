<template>
  <div>
    <breadcrumb :routes="routes"></breadcrumb>
    <div class="account-security-password-content">
      <a-form layout="horizontal" :form="form">
        <a-form-item
          label="原密码"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <a-input-password
            placeholder="原密码"
            v-decorator="['password', { rules: [{ required: true, message: '请输入原密码' }] }]"
          />
        </a-form-item>
        <a-form-item
          label="新密码"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <a-input-password
            placeholder="新密码"
            v-decorator="['newPassword', { rules: [
              { required: true, message: '请输入新密码' },
              { validator: validateToNextPassword },
              { validator: passwordStrengthCheck }
            ]}]"
            @blur="handleBlur"
          />
          <div v-if="strength" class="password-strength-wraper">
            <label>强度：</label>
            <span :class="strength"></span>
            <label>{{ mapPasswordStrength[strength] }}</label>
          </div>
        </a-form-item>
        <a-form-item
          label="确认新密码"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <a-input-password
            placeholder="确认新密码"
            v-decorator="['confirm', { rules: [
              { required: true, message: '请再次确认新密码' },
              { validator: compareToFirstPassword }
            ]}]"
          />
        </a-form-item>
        <a-form-item
          :wrapper-col="buttonItemLayout.wrapperCol"
        >
          <a-button type="primary" html-type="button" @click="handleSubmit" :loading="submitLoading" :disabled="submitLoading">
            保存
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
import debounce from 'lodash/debounce';
import { formItemLayout, buttonItemLayout } from './form-layout';
import { setUserPassword } from '@/utils/api';

//校验密码强度
function checkPassWord(value){
  // 0： 表示第一个级别 1：表示第二个级别 2：表示第三个级别
  // 3： 表示第四个级别 4：表示第五个级别
  var modes = 0;
  if(/\d/.test(value)){//如果用户输入的密码 包含了数字
    modes++;
  }
  if(/[a-z]/.test(value)){//如果用户输入的密码 包含了小写的a到z
    modes++;
  }
  if(/[A-Z]/.test(value)){//如果用户输入的密码 包含了大写的A到Z
    modes++;
  }
  if(/\W/.test(value)){//如果是非数字 字母 下划线
    modes++;
  }
  return modes;
}

export default {
  beforeCreate () {
    this.form = this.$form.createForm(this);
  },
  data() {
    return {
      routes: [
        {
          path: '/',
          breadcrumbName: 'home',
        },{
          path: '/account/setting',
          breadcrumbName: 'personalsetting',
        },{
          breadcrumbName: 'accountpassword'
        }
      ],
      strength: '',
      confirmDirty: false,
      mapPasswordStrength: {
        'weak': '弱',
        'good': '中',
        'strong': '强',
        '': '弱'
      },
      submitLoading: false
    };
  },
  computed: {
    formItemLayout,
    buttonItemLayout,
  },
  methods: {
    handleSubmit () {
      this.form.validateFields(async (err, values) => {
        this.submitLoading = true;
        if (!err) {
          values.passwordStrenth = this.strength;
          const res = await setUserPassword({body: values});
          if(res.data && res.data.code === 20000){
            this.$message.success('密码修改成功');
            this.$store.commit('setUser', {passwordStrenth: this.strength})
          }else{
            this.$message.error('密码修改失败');
          }
          this.form.setFields({
            password: '',
            newPassword: '',
            confirm: ''
          })
          this.strength = '';
        }
        this.submitLoading = false;
      });
    },
    handleBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    passwordStrengthCheck: debounce(function(rule, value, callback){
      if (value) {
        const strengthLevel = checkPassWord(value);
        if (strengthLevel === 0 || strengthLevel === 1) this.strength = 'weak';
        else if (strengthLevel === 2) this.strength = 'good';
        else this.strength = 'strong';
        value.length < 6 ? callback('密码不能小于6位') : callback();
      } else {
        this.strength = '';
      }
    }, 500),
    validateToNextPassword: debounce(function(rule, value, callback){
      const confirmPassword = this.form.getFieldValue('confirm')
      if (value && confirmPassword && value !== confirmPassword) {
        callback('输入的两次新密码不一致!');
      } else {
        callback();
        this.form.validateFields(['confirm'], err => err && console.log(err));
      }
    }, 500),
    compareToFirstPassword: debounce(function(rule, value, callback){
      const firstPassword = this.form.getFieldValue('newPassword');
      if (value && value !== firstPassword) {
        callback('输入的两次新密码不一致!');
      } else {
        callback();
        this.form.validateFields(['newPassword'], err => err && console.log(err));
      }
    }, 500),
  },
}
</script>

<style lang="scss">
.account-security-password-content{
  @include contentPannel;
  .password-strength-wraper{
    display: flex;
    justify-content: flex-start;
    label{
      flex: 0 0 auto;
    }
    span{
      flex: 0 0 200px;
      position: relative;
      margin-right: 10px;
      &::before{
        content: '';
        display: block;
        position: absolute;
        height: 8px;
        background: #eee;
        width: 60px;
        top: 50%;
        margin-top: -4px;
        left: 0;
        border-radius: 2px;
        box-shadow: 70px 0 0 #eee, 140px 0 0 #eee;
      }
    }
    .weak{
      &::before{
        background: $error-color;
      }
    }
    .good{
      &::before{
        background: $warning-color;
        box-shadow: 70px 0 0 $warning-color, 140px 0 0 #eee;
      }
    }
    .strong{
      &::before{
        background: $success-color;
        box-shadow: 70px 0 0 $success-color, 140px 0 0 $success-color;
      }
    }
  }
}
</style>