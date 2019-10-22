<template>
  <div class="account-setting-page">
    <a-menu class="menu" :defaultSelectedKeys="current" @click="({key}) => current = [key]">
      <a-menu-item key="base">基本设置</a-menu-item>
      <a-menu-item key="safe">安全设置</a-menu-item>
    </a-menu>
    <div class="setting-content">
      <div v-if="current[0] === 'base'">
        <h2>基本设置</h2>
        <div class="base-setting-wraper">
          <a-form class="form" layout="vertical">
            <a-form-item label="邮箱">
              <a-input
                v-decorator="[
                  'email',
                  { rules: [
                    { required: true, message: '请输入邮箱' },
                    { type: 'email', message: '请输入正确的邮箱' }
                  ]} 
                ]"
                placeholder="邮箱"
                :value="user.email"
              />
            </a-form-item>
            <a-form-item label="昵称">
              <a-input
                v-decorator="[
                  'nickName',
                  { rules: [
                    { required: true, message: '请输入昵称' }
                  ]} 
                ]"
                :value="user.nickName"
                placeholder="昵称"
              />
            </a-form-item>
            <a-form-item label="个人简介">
              <a-input type="textarea" placeholder="个人简介" :autosize="{minRows: 4, maxRows: 4}" :value="user.profile"/>
            </a-form-item>
            <a-form-item label="国家/地区">
              <a-select default-value="中国">
                <a-select-option value="中国">中国</a-select-option>
                <a-select-option value="美国">美国</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="所在省市">
              <div class="city-select-wraper">
                <a-select :defaultValue="provinceData[0]" class="city-select" @change="handleProvinceChange">
                  <a-select-option v-for="province in provinceData" :key="province"
                    >{{province}}</a-select-option
                  >
                </a-select>
                <a-select v-model="secondCity" class="city-select">
                  <a-select-option v-for="city in cities" :key="city">{{city}}</a-select-option>
                </a-select>
              </div>
            </a-form-item>
            <a-form-item label="街道地址">
              <a-input placeholder="街道地址" />
            </a-form-item>
            <a-form-item label="职位">
              <a-input placeholder="职位" />
            </a-form-item>
            <a-form-item label="联系电话">
              <div class="phone-wraper">
                <div class="left"><a-input placeholder="区号" /></div>
                <div class="right"><a-input placeholder="座号"  /></div>
              </div>
            </a-form-item>
          </a-form>
          <div class="avatar-edit-wraper">
            <h4>头像</h4>
            <a-avatar :size="144" icon="user" :src="user.avatarUrl" />
            <a-upload
              class="change-avatar-btn"
              name="file"
              :showUploadList="false"
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            >
              <a-button><a-icon type="cloud-upload" />更换头像</a-button>
            </a-upload>
          </div>
        </div>
      </div>
      <div v-if="current[0] === 'safe'">
        <h2>安全设置</h2>
        <security />
      </div>
    </div>
  </div>
</template>

<script>
import security from './security/index';

const provinceData = ['广东省', '福建省'];
const cityData = {
  '广东省': ['深圳市', '惠州市', '汕头市'],
  '福建省': ['厦门市'],
};

export default {
  components: { security },
  data(){
    return{
      current: ['base'],
      provinceData,
      cityData,
      cities: cityData[provinceData[0]],
      secondCity: cityData[provinceData[0]][0],
    }
  },
  computed: {
    user(){
      let user = this.$store.getters && this.$store.getters.user;
      if (!user) user = this.$storage.get('user') || {};
      return user;
    }
  },
  methods: {
    handleProvinceChange(value) {
      this.cities = cityData[value];
      this.secondCity = cityData[value][0];
    }
  }
}
</script>

<style lang="scss">
.account-setting-page{
  background: #fff;
  padding: 20px 0;
  display: flex;
  .menu{
    min-width: 220px;
  }
  .ant-menu-item{
    margin-right: -1px;
  }
  .ant-menu-item-selected{
    font-weight: 600;
    &::after{
      transform: scaleY(1);
      opacity: 1;
      transition: transform 0.15s cubic-bezier(0.645, 0.045, 0.355, 1), opacity 0.15s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
  }
  h2{
    margin: 0 0 30px;
  }
  .setting-content{
    flex: 1 1 auto;
    padding: 5px 30px;
  }
  .base-setting-wraper{
    display: flex;
    .form{
      min-width: 300px;
      max-width: 100%;
    }
    .avatar-edit-wraper{
      padding-left: 104px;
      h4{
        font-weight: normal;
      }
    }
  }
  .change-avatar-btn{
    display: block;
    width: 144px;
    text-align: center;
    margin: 20px 0;
  }
  .city-select-wraper{
    display: flex;
    margin: -5px;
  }
  .city-select{
    width: 50%;
    padding: 5px;
  }
  .phone-wraper{
    display: flex;
    margin: -5px;
    .left, .right{
      padding: 5px;
    }
    .left{
      flex: 0 0 120px;
    }
    .right{
      flex: 1 1 auto;
    }
  }
}
</style>