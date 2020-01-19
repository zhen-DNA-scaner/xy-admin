<template>
  <div>
    <breadcrumb :routes="routes"></breadcrumb>
    <div class="cloud-page">
      <cloud></cloud>
    </div>
  </div>
</template>

<script>
import cloud from '@/components/cloud'
export default {
  components: {cloud},
  data(){
    return{
      routes: [
        {
          breadcrumbName: 'Cloud',
          multilingual: 'menu.cloud' // true(boolean) or language file attribute(string)
        }
      ]
    }
  },
}
</script>

<style lang="scss">
.cloud-page{
  background: #fff;
}
</style>