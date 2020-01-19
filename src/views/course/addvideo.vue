<template>
  <div>
    <breadcrumb :routes="routes"></breadcrumb>
    <div class="addvideo-container">
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      routes: [
        {
          path: '/',
          breadcrumbName: 'Home',
          multilingual: 'menu.home' // true(boolean) or language file attribute(string)
        },{
          breadcrumbName: '上传视频'
        }
      ],
    }
  }
}
</script>

<style lang="scss">
.addvideo-container{
  @include contentPannel;
}
</style>