<template>
  <div :class="['status-block', status]">
    <div><span class="icon-wraper"><a-icon :type="icon" :style="{color: '#fff', fontSize: '1em'}" /></span></div>
    <h2>{{h2txt}}</h2>
    <p class="gray">{{description}}</p>
  </div>
</template>

<script>
export default {
  props: ['status', 'description', 'title'],
  computed: {
    h2txt(){
      if(this.title) return this.title;
      else return this.status === 'success' ? '提交成功' : '提交失败'
    },
    icon(){
      return this.status === 'success' ? 'check' : 'close'
    }
  }
}
</script>

<style lang="scss">
.status-block{
  text-align: center;
  .icon-wraper{
    display: inline-flex;
    font-size: 40px;
    width: 2em;
    height: 2em;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    margin: 20px;
  }
  h2{
    font-size: 24px;
  }
  .gray{
    max-width: 800px;
    color: #999;
    margin: 0 auto;
  }
  &.success{
    .icon-wraper{
      background: $success-color;
    }
  }
  &.fail{
    .icon-wraper{
      background: $error-color;
    }
  }
}
</style>