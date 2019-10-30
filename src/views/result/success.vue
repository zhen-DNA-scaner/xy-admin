<template>
  <div class="result-page result-page-success">
    <div class="status-block">
      <div><span class="icon-wraper"><a-icon type="check" :style="{color: '#fff', fontSize: '1em'}" /></span></div>
      <h2>提交成功</h2>
      <p class="gray">提交结果页用于反馈一系列操作任务的处理结果， 如果仅是简单操作，使用 Message 全局提示反馈即可。 本文字区域可以展示简单的补充说明，如果有类似展示 “单据”的需求，下面这个灰色区域可以呈现比较复杂的内容。</p>
    </div>
    <div class="content-wraper">
      <div class="title-info">
        <span>ID: 13412</span>
        <span>作者：毛毛</span>
        <span>审核时间：2019-10-30 ~ 2019-11-03</span>
      </div>
      <a-steps class="steps-container" progressDot :current="0" size="small">
        <a-step title="发表文章" description="2019-10-30" />
        <a-step title="管理员初审" />
        <a-step title="完成" />
      </a-steps>
    </div>
    <div class="btns-wraper">
      <a-button type="primary" @click="()=>$router.go(-1)">返回</a-button>
    </div>
  </div>
</template>

<style lang="scss" src="./result.scss"></style>
<style lang="scss" scoped>
.result-page-success{
  .title-info{
    padding: 0 20px;
    display: flex;
    justify-content: space-around;
  }
  .steps-container{
    padding: 50px 20px 20px;
  }
}
</style>