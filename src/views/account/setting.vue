<template>
  <div class="account-setting-page">
    <a-menu class="menu" :defaultSelectedKeys="current" @click="({key}) => current = [key]">
      <a-menu-item key="base">基本设置</a-menu-item>
      <a-menu-item key="safe">安全设置</a-menu-item>
    </a-menu>
    <div class="setting-content">
      <div v-if="current[0] === 'base'">
        <h2>基本设置</h2>
      </div>
      <div v-if="current[0] === 'safe'">
        <h2>安全设置</h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      current: ['base']
    }
  }
}
</script>

<style lang="scss">
.account-setting-page{
  background: #fff;
  padding: 20px 0;
  display: flex;
  .menu{
    min-width: 220px;
  }
  .ant-menu-item{
    margin-right: -1px;
  }
  .ant-menu-item-selected{
    font-weight: 600;
    &::after{
      transform: scaleY(1);
      opacity: 1;
      transition: transform 0.15s cubic-bezier(0.645, 0.045, 0.355, 1), opacity 0.15s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
  }
}
</style>