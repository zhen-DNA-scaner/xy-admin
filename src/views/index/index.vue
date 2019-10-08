<template>
  <layout>
    <card />
    <sales-card />
    <a-row class="analysis-sales-container" type="flex" :gutter="20">
      <a-col :span="12"><search-key /></a-col>
      <a-col :span="12"><category /></a-col>
    </a-row>
    <stores />
  </layout>
</template>

<script>
import card from './components/card';
import salesCard from './components/sales-card';
import searchKey from './components/search-key';
import category from './components/category';
import stores from './components/stores';
export default {
  components: {
    card,
    salesCard,
    searchKey,
    category,
    stores
  },
  mounted(){
  },
  data(){
    return{
    }
  },
  methods: {
  }
}
</script>

<style lang="scss">
  .analysis-sales-container{
    margin: 0 0 20px;
    overflow: hidden;
  }
</style>