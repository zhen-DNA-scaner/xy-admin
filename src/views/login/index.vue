<template>
  <div class="login-page">
    <div class="top-wraper">
      <div class="center">
        <a href="https://xiaoyueit.com" target="_blank">
          <img class="logo" src="img/logo/logo.svg" alt="晓月" />
        </a>
        <p class="subtitle">晓月IT集设计与开发于一身</p>
      </div>

      <div class="form-wraper">
        <component :is="type" @onForget="type = 'forget'" @onLogin="type = 'login-form'"></component>
      </div>
    </div>
    <footer class="center">Copyright <a-icon type="copyright" /> 2019 晓月IT工作室</footer>
  </div>
</template>

<script>
  import loginForm from './components/main'
  import forget from './components/forget'
  export default {
    layout: 'simple-background',
    components: {loginForm, forget},
    data(){
      return{
        type: 'login-form'
      }
    }
  }
</script>
<style lang="scss">
  .login-page{
    background: url('/img/logo/login-bg.svg') center top;
    background-size: 100% auto;
    .custom-tabs{
      .ant-tabs-bar{
        border: 0;
        margin-bottom: 20px;
      }
    }
    .ant-tabs-nav-scroll{
      display: flex;
      justify-content: center;
    }
    .subtitle{
      color: $text-color-secondary;
      margin: 1em 0;
      font-size: $font-size-base;
    }
  }
  .login-page{
    display: flex;
    flex-direction: column;
    .top-wraper{
      flex: 1 1 auto;
      padding-top: 60px;
    }
    @media screen and (min-width:376px){
      .top-wraper{
        padding-top: 100px;
      }
    }
    .logo{
      height: 50px;
    }
    .form-wraper{
      width: 400px;
      margin: 20px auto;
      padding: 0 30px;
      max-width: 100%;
    }

    footer{
      padding: 30px 0;
      color: #999;
    }

    .center{
      text-align: center;
    }
  }
</style>