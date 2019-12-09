<template>
  <div id="app">
    <!-- <router-view v-if="$router.currentRoute.meta.layout === 'none'"/> -->
    <Layout v-if="isLogin && $router.currentRoute.meta.layout !== 'none'">
      <router-view/>
      <!-- <keep-alive>
        <router-view/>
      </keep-alive> -->
    </Layout>
    <router-view v-else />
  </div>
</template>

<script>
import Layout from './views/layout';
import { isLogin } from './utils/auth'
export default {
  components: { Layout },
  data(){
    return{
      isLogin: false
    }
  },
  watch: {
    $route(){
      this.isLogin = isLogin()
    }
  }
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
.primary{
  color: $primary-color;
}
.error{
  color: $error-color;
}
</style>
