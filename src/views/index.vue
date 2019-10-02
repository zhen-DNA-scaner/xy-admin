<template>
  <layout>
    首页
  </layout>
</template>

<script>
import axios from 'axios'
export default {
  mounted(){
    axios.post('/captcha', {email: '2727727@qq.com'}).then(res=>{
      console.log(res)
    })
  }
}
</script>