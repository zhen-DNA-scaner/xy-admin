<template>
  <div class="xy-dropdown-wraper" @click="extendDropdown">
    <slot></slot>
    <transition name="fadeUp">
      <div v-show="showDropdown" class="xy-dropdown">
        <slot name="content"></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  mounted(){
    document.body.addEventListener('click', this.globalEvent);
  },
  data(){
    return{
      showDropdown: false
    }
  },
  methods: {
    extendDropdown(){
      this.showDropdown = true;
    },
    globalEvent(e){
      if(!this.$el.contains(e.target)) this.showDropdown = false;
    }
  }
}
</script>

<style lang="scss">
  .xy-dropdown-wraper{
    position: relative;
    .virtual-btn{
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      z-index: 1;
    }
    .btn{
      display: inline-block;
    }
    .xy-dropdown{
      position: absolute;
      top: 100%;
      right: 0;
      min-width: 100%;
      box-shadow: 0 4px 8px rgba(0,0,0,.15);
      background-color: #fff;
      &>ul{
        margin: 0;
        list-style: none;
        padding: 0;
      }
    }
    .fadeUp-enter-active, .fadeUp-leave-active {
      transition: all .3s;
    }
    .fadeUp-enter, .fadeUp-leave-to /* .fade-leave-active below version 2.1.8 */ {
      opacity: 0;
      margin-top: 10px;
    }
  }
</style>