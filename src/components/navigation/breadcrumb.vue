<template>
  <div class="xy-breadcrumb">
    <a-breadcrumb :routes="routes">
      <template slot="itemRender" slot-scope="{route}">
        <router-link v-if="route.multilingual" :to="route">
          {{ $t(route.multilingual) }}
        </router-link>
        <span v-else v-html="route.breadcrumbName"></span>
      </template>
    </a-breadcrumb>
    <slot />
  </div>
</template>

<script>
export default {
  props: ['routes']
}
</script>

<style lang="scss">
.xy-breadcrumb{
  background-color: #fff;
  margin: -20px -20px 20px;
  padding: 20px;
}
</style>