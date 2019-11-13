<template>
  <div>
    <breadcrumb :routes="routes" tips="将一个冗长或用户不熟悉的表单任务分成多个步骤，指导用户完成。"></breadcrumb>
    <div class="form-stepbystep-content">
      <a-steps class="a-steps-custom" :current="currentStep">
        <a-step title="填写账户信息" />
        <a-step title="确认转账信息" />
        <a-step title="完成" />
      </a-steps>
      <a-form layout="horizontal" :form="form" v-show="currentStep === 0">
        <a-form-item label="收款账户" v-bind="formItemLayout">
          <a-input-group class="select-input-wraper">
            <a-select :defaultValue="formValues.payType" @change="val => formValues.payType = val">
              <a-select-option value="alipay">支付宝</a-select-option>
              <a-select-option value="wepay">微信</a-select-option>
            </a-select>
            <a-input
              placeholder="请输入账户"
              v-decorator="['account', {rules: [
                { required: true, message: '请输入账户' }
              ]}]"
            />
          </a-input-group>
        </a-form-item>
        <a-form-item label="收款人" v-bind="formItemLayout">
          <a-input placeholder="请输入收款人姓名" v-decorator="['name', { rules: [{ required: true, message: '请输入收款人姓名' }] }]" />
        </a-form-item>
        <a-form-item label="收款金额" v-bind="formItemLayout">
          <a-input
            placeholder="请输入金额"
            v-decorator="['mount', { 
              rules: [
                { required: true, message: '请输入金额' },
                { validator: amountValidator }
              ] 
            }]"
          />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 14, offset: 8 }">
          <a-button type="primary" html-type="button" @click="nextStepHandle" :loading="accountLoading">
            下一步
          </a-button>
        </a-form-item>
      </a-form>
      <div class="form-confirm-wraper" v-show="currentStep === 1">
        <a-row>
          <a-col :span="formItemLayout.wrapperCol.span" :offset="formItemLayout.labelCol.span">
            <a-alert message="确认转账后，资金将直接打入对方账户，无法退回。" type="info" showIcon />
            <div class="account-info-wraper">
              <p><label>收款账户：</label>{{formValues.account}}（{{payWay}}）</p>
              <p><label>收款人：</label>{{formValues.name}}</p>
              <p><label>转账金额：</label><b>{{formValues.mount}}</b>元</p>
            </div>
            <a-divider />
            <div class="qrcode-wraper">
              <img src="data:image/jpg;base64,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" />
              <p>打开{{payWay}}扫码支付</p>
              <div class="btn-wraper">
                <a-button type="primary" html-type="button" @click="payHandle" :loading="payLoading" :disabled="payLoading">已完成支付</a-button>
                <a-button @click="()=>currentStep -= 1">上一步</a-button>
              </div>
            </div>
          </a-col>
        </a-row>
      </div>
      <div class="complete-wraper" v-if="currentStep === 2">
        <status title="支付成功" description="金额及时到账" status="success"></status>
        <a-row>
          <a-col :span="formItemLayout.wrapperCol.span" :offset="formItemLayout.labelCol.span">
            <div class="account-info-wraper">
              <p><label>收款账户：</label>{{formValues.account}}（{{payWay}}）</p>
              <p><label>收款人：</label>{{formValues.name}}</p>
              <p><label>转账金额：</label><b>{{formValues.mount}}</b>元</p>
            </div>
          </a-col>
        </a-row>
        <div class="btn-wraper">
          <a-button type="primary" html-type="button" @click="completeHandle">完成</a-button>
          <a-button html-type="button">查看账单</a-button>
        </div>
      </div>
      <a-divider />
      <div class="description-p">
        <h3>说明</h3>
        <p>
          转账到支付宝账户<br />
          如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
          <br />
        </p>
        <br />
        <p>
          转账到银行卡<br />
          如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import status from '@/components/feedback/status/index';
export default {
  components: {status},
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
          breadcrumbName: 'Step by step Form',
          multilingual: 'menu.formstepbystep'
        }
      ],
      currentStep: 0,
      accountLoading: false,
      payLoading: false,
      formItemLayout: {
        labelCol: { span: 8 },
        wrapperCol: { span: 9 },
      },
      formValues: {
        payType: 'alipay'
      }
    }
  },
  computed: {
    payWay(){
      return this.formValues.payType === 'wepay' ? '微信' : '支付宝'
    }
  },
  methods: {
    nextStepHandle(){
      switch(this.currentStep){
        case 0:
          this.form.validateFields(async (err, values) => {
            if(!err){
              this.currentStep++
              this.formValues = Object.assign(this.formValues, values)
            }
          })
      }
    },
    amountValidator(rule, value, callback){
      const mount = this.form.getFieldValue('mount')
      if (mount<=0) {
        callback('收款金额不能小于0');
      }else{
        callback();
      }
    },
    payHandle(){
      this.payLoading = true;
      setTimeout(()=>{
        this.payLoading = false;
        this.currentStep += 1;
      }, 2000)
    },
    completeHandle(){
      this.form.resetFields()
      this.currentStep = 0
    }
  }
}
</script>

<style lang="scss">
.form-stepbystep-content{
  @include contentPannel;
  .a-steps-custom{
    padding: 30px 20% 50px;
  }
  .select-input-wraper{
    display: flex!important;
    align-items: center;
  }
  .ant-select-selection{
    border-right: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  .description-p{
    color: #999;
    padding: 0 10%;
  }
  .account-info-wraper{
    padding: 20px 0 0;
    b{
      font-size: 26px;
      margin-right: 6px;
      font-weight: 400;
    }
  }
  .qrcode-wraper{
    text-align: center;
    img{
      width: 160px;
    }
    p{
      font-size: 12px;
      color: #999;
    }
  }
  .btn-wraper{
    margin-bottom: 20px;
    button{
      margin: 0 10px;
    }
  }
  .complete-wraper{
    .account-info-wraper{
      background: rgba(0,0,0,0.02);
      padding: 30px;
      margin: 20px 0;
    }
    p:last-of-type{
      margin-bottom: 0;
    }
    .btn-wraper{
      text-align: center;
    }
  }
}
</style>