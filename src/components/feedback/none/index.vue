<template>
  <message-none-icon class="data-none-wraper">
    <slot></slot>
  </message-none-icon>
</template>

<script>
import messageNoneIcon from '@/components/icons/message-none.vue';
export default {
  components: {
    messageNoneIcon
  }
}
</script>

<style lang="scss">
.data-none-wraper{
  text-align: center;
  color: #bbb;
  margin: 40px 0 60px;
  svg{
    font-size: 70px!important;
  }
  p{
    color: #bbb;
  }
}
</style>