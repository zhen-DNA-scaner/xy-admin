<template>
  <div id="app">
    <router-view v-if="$router.currentRoute.meta.layout === 'none'"/>
    <Layout v-else>
      <router-view/>
      <!-- <keep-alive>
        <router-view/>
      </keep-alive> -->
    </Layout>
  </div>
</template>

<script>
import Layout from './views/layout';
export default {
  components: { Layout }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.ant-skeleton {
  ul{
    padding: 0;
    margin-top: 22px !important;
  }
  li{
    margin-top: 14px!important;
  }
}
</style>
