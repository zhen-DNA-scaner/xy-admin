<template>
  <div class="account-security-wraper">
    <div class="item">
      <div class="header">
        账户密码
        <router-link to="/account/setting/password">修改</router-link>
      </div>
      <p>当前密码强度：弱</p>
    </div>
    <a-divider />
    <div class="item">
      <div class="header">
        密保手机
        <a>修改</a>
      </div>
      <p>已绑定手机：156****5661</p>
    </div>
    <a-divider />
    <div class="item">
      <div class="header">
        备用邮箱
        <a>修改</a>
      </div>
      <p>已绑定邮箱：724***302@qq.com</p>
    </div>
    <a-divider />
    <div class="item">
      <div class="header">
        密保问题
        <a>设置</a>
      </div>
      <p>未设置密保问题，密保问题可有效保护账户安全</p>
    </div>
    <a-divider />
  </div>
</template>

<style lang="scss">
.account-security-wraper{
  .header{
    display: flex;
    justify-content: space-between;
  }
  p{
    color: #999;
    margin: 6px 0;
  }
  .ant-divider{
    margin: 20px 0;
  }
}
</style>