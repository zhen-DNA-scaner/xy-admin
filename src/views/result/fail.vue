<template>
  <div class="result-page result-page-fail">
    <status status="fail" description="请核对并修改以下信息后，再重新提交。"></status>
    <div class="content-wraper">
      <h3>您提交的内容有如下错误：</h3>
      <p>
        <a-icon type="close-circle" :style="{color: 'red'}" />
        您的账户已被冻结
        <router-link to="/">立即解冻<a-icon type="right" /></router-link>
      </p>
      <p>
        <a-icon type="close-circle" :style="{color: 'red'}" />
        您的账户还不具备申请资格
        <router-link to="/">立即升级<a-icon type="right" /></router-link>
      </p>
    </div>
    <div class="btns-wraper">
      <a-button type="primary" @click="()=>$router.go(-1)">返回</a-button>
    </div>
  </div>
</template>

<script>
import status from '@/components/feedback/status/index';
export default {
  components: {status}
}
</script>

<style lang="scss" src="./result.scss"></style>
<style lang="scss" scoped>
.result-page-fail{
  h3{
    margin: 0 0 20px;
  }
}
</style>