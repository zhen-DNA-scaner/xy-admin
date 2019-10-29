<template>
  <a-row :gutter="8">
    <a-col :span="14">
      <slot />
    </a-col>
    <a-col :span="10">
      <a-button block :size="size" @click="getCaptcha" :disabled="captchaDisabled">{{captchaText || '发送验证码'}}</a-button>
    </a-col>
  </a-row>
</template>

<script>
export default {
  props: {
    size: {type: String, default: 'default'},
  },
  data(){
    return{
      captchaText: '',
      captchaDisabled: false,
    }
  },
  methods: {
    getCaptcha(){
      this.$emit('getCaptcha', this.captchaCountdown);
    },
    captchaCountdown () {
      let time = 60000;
      this.captchaText = `${time/1000}s`;
      const timer = setInterval(()=>{
        time -= 1000;
        if(time === 0) {
          clearInterval(timer);
          this.captchaText = '';
          this.captchaDisabled = false;
        }else{
          this.captchaText = `${time/1000}s`;
        }
      }, 1000);
      this.captchaDisabled = true;
    },
  }
}
</script>