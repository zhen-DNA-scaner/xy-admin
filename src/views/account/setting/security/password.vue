<template>
  <div>
    <breadcrumb :routes="routes"></breadcrumb>
    <div class="account-security-password-content">
      <a-form :layout="formLayout" :form="form">
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
            <label>{{ strength === 'weak' ? '弱' : strength === 'good' ? '中' : '强' }}</label>
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
          <a-button type="primary" html-type="submit">
            保存
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
import debounce from 'lodash/debounce';

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
      formLayout: 'horizontal',
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
      confirmDirty: false
    };
  },
  computed: {
    formItemLayout () {
      const { formLayout } = this;
      return formLayout === 'horizontal' ? {
        labelCol: { span: 9 },
        wrapperCol: { span: 7 },
      } : {};
    },
    buttonItemLayout () {
      const { formLayout } = this;
      return formLayout === 'horizontal' ? {
        wrapperCol: { span: 14, offset: 9 },
      } : {};
    },
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault();

      this.form.validateFields(async (err, values) => {
        if (!err) {
          console.log(values)
        }
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
    }, 200),
    compareToFirstPassword: debounce(function(rule, value, callback){
      const form = this.form;
      if (value && value !== form.getFieldValue('newPassword')) {
        callback('输入的两次新密码不一致!');
      } else {
        callback();
      }
    }, 200),
    validateToNextPassword: debounce(function(rule, value, callback){
      const form = this.form;
      if (this.confirmDirty && value) form.validateFields(['confirm'], { force: true });
      callback();
    }, 200),
  },
}
</script>

<style lang="scss">
.account-security-password-content{
  background-color: #fff;
  padding: 30px;
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