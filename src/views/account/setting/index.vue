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
          <a-form class="form" layout="vertical" :form="form">
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
                placeholder="昵称"
              />
            </a-form-item>
            <a-form-item label="个人简介">
              <a-input v-decorator="['profile']" type="textarea" placeholder="个人简介" :autosize="{minRows: 4, maxRows: 4}"/>
            </a-form-item>
            <!-- <a-form-item label="国家/地区">
              <a-select default-value="中国">
                <a-select-option value="中国">中国</a-select-option>
                <a-select-option value="美国">美国</a-select-option>
              </a-select>
            </a-form-item> -->
            <a-form-item
              label="所在省"
            >
              <a-select v-decorator="['province']" @change="handleProvinceChange">
                <a-select-option v-for="province in provinceData" :key="province"
                  >{{province}}</a-select-option
                >
              </a-select>
            </a-form-item>
            <a-form-item
              label="所在市"
            >
              <a-select v-decorator="['city']">
                <a-select-option v-for="city in cities" :key="city">{{city}}</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="街道地址">
              <a-input placeholder="街道地址" v-decorator="['address']" />
            </a-form-item>
            <a-form-item label="职位">
              <a-input placeholder="职位" v-decorator="['job']" />
            </a-form-item>
            <a-form-item label="联系电话">
              <a-input placeholder="联系电话" v-decorator="['phone']" />
            </a-form-item>
            <a-form-item>
              <a-button type="primary" @click="onSave" :loading="saveLoading" :disabled="saveLoading">保存</a-button>
              <a-button class="reset-btn" @click="initUserData" :disabled="saveLoading">重置</a-button>
            </a-form-item>
          </a-form>
          <div class="avatar-edit-wraper">
            <h4>头像</h4>
            <a-avatar :size="144" icon="user" :src="avatarUrl" />
            <a-upload
              class="change-avatar-btn"
              name="file"
              accept="image/gif, image/jpeg, image/jpg, image/png"
              :showUploadList="false"
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              :disabled="avatarLoading"
              @change="uploadAvatarHandle"
            >
              <a-button :loading="avatarLoading"><a-icon type="cloud-upload" />更换头像</a-button>
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
import { setUser } from '@/utils/api';

const provinceData = ['广东省', '福建省'];
const cityData = {
  '广东省': ['深圳市', '惠州市', '汕头市'],
  '福建省': ['厦门市'],
};

export default {
  components: { security },
  created(){
    this.form = this.$form.createForm(this);
  },
  mounted(){
    this.initUserData();
  },
  data(){
    return{
      current: ['base'],
      provinceData,
      cityData,
      cities: cityData[provinceData[0]],
      secondCity: cityData[provinceData[0]][0],
      avatarUrl: null,
      saveLoading: false,
      avatarLoading: false
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
    initUserData(){
      const { email, nickName, profile, province, city, address, job, phone, avatarUrl } = this.user;
      this.$nextTick(()=>{
        this.form.setFieldsValue({ email, nickName, profile, province, city, address, job, phone });
        this.avatarUrl = avatarUrl;
      })
    },
    handleProvinceChange(value) {
      this.cities = cityData[value];
      this.form.setFieldsValue({
        city: cityData[value][0]
      });
    },
    onSave(){
      this.form.validateFields(async (err, values) => {
        if(!err){
          this.saveLoading = true;
          if(this.avatarUrl !== this.user.avatarUrl){
            values.avatarUrl = this.avatarUrl;
          }

          const res = await setUser({body: values});
          if(res.data && res.data.code === 20000){
            this.$store.commit('setUser', res.data.data);
          }
          this.saveLoading = false;
        }
      })
    },
    uploadAvatarHandle({ file }){
      this.avatarLoading = true;
      if(file.response){
        this.avatarLoading = false;
        this.avatarUrl = file.response.thumbUrl;
      }
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
  .reset-btn{
    margin-left: 10px;
  }
}
</style>