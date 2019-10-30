<template>
  <div>
    <a-row type="flex" :gutter="20">
      <a-col :span="6">
        <div class="acount-center-left">
          <a-skeleton :loading="!user.nickName && !user.email" :paragraph="{rows: 6}">
            <div>
              <div class="avatar-wraper" v-if="user.nickName || user.email">
                <a-avatar :size="100" icon="user" :src="user.avatarUrl" />
                <h3>{{ user.nickName || user.email }}</h3>
                <p>{{ profile }}</p>
              </div>
              <div class="detail">
                <p><a-icon type="idcard" /> {{ user.job || '暂无职位' }}</p>
                <p><address-icon /> {{ address }}</p>
              </div>
              <a-divider dashed />
              <div>
                <h4>标签</h4>
                <div class="tags-wraper">
                  <template v-for="(tag, index) in user.tags">
                    <a-tooltip v-if="tag.length > 10" :key="tag" :title="tag">
                      <a-tag :key="tag" :closable="index !== 0" :afterClose="() => handleClose(tag)">
                        {{`${tag.slice(0, 10)}...`}}
                      </a-tag>
                    </a-tooltip>
                    <a-tag v-else :key="tag" :closable="index !== 0" :afterClose="() => handleClose(tag)">
                      {{tag}}
                    </a-tag>
                  </template>
                  <a-input
                    v-if="inputVisible"
                    ref="input"
                    type="text"
                    size="small"
                    :style="{ width: '78px' }"
                    :value="inputValue"
                    @change="handleInputChange"
                    @blur="handleInputConfirm"
                    @keyup.enter="handleInputConfirm"
                  />
                  <a-tag v-else @click="showInput" style="background: #fff; borderStyle: dashed;">
                    <a-icon type="plus" />
                  </a-tag>
                </div>
              </div>
            </div>
          </a-skeleton>
        </div>
      </a-col>
      <a-col :span="18">
        <div class="acount-dynamic">
          <h2>个人动态</h2>
          <div v-if="dynamicList">
            <a-timeline>
              <a-timeline-item v-for="item in dynamicList" :key="item._id" :color="mapStatus[item.status]">
                <div :style="{display: 'inline-block'}" v-html="item.action"></div> <span class="gray">{{item.createTime}}</span>
              </a-timeline-item>
            </a-timeline>
          </div>
          <data-none v-else><p>暂无动态哟</p></data-none>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { Random } from '@/utils';
import addressIcon from '@/components/icons/address';
import { getUserDynamic } from '@/utils/api';
export default {
  components: {
    addressIcon
  },
  mounted(){
    Promise.all([
      getUserDynamic(),
    ])
    .then(res => {
      if(res[0].data && res[0].data.code === 20000){
        this.dynamicList = res[0].data.data;
      }
    })
  },
  data(){
    return{
      mapProfile: ['海纳百川，有容乃大', '心是佛净土，何处惹尘埃', '站在巨人的肩膀上做事'],
      mapStatus: {
        'success': 'green',
        'error': 'red',
      },
      inputVisible: false,
      inputValue: '',
      dynamicList: null
    }
  },
  computed: {
    user(){
      let user = this.$store.getters && this.$store.getters.user;
      if (!user) user = this.$storage.get('user') || {};
      return user;
    },
    profile(){
      const profile = this.mapProfile[Random.int(0, 2)];
      return this.user.profile || profile;
    },
    address(){
      if (!this.user.province && !this.user.city) return '暂无地址';
      else return this.user.province + this.user.city
    },
  },
  methods: {
    handleClose(removedTag) {
      const tags = this.user.tags.filter(tag => tag !== removedTag);
      this.user.tags = tags;
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(function() {
        this.$refs.input.focus();
      });
    },

    handleInputChange(e) {
      this.inputValue = e.target.value;
    },

    handleInputConfirm() {
      const inputValue = this.inputValue;
      let tags = this.user.tags;
      if (inputValue && tags.indexOf(inputValue) === -1) {
        tags = [...tags, inputValue];
      }
      this.user.tags = tags;
      this.inputVisible = false;
      this.inputValue = '';
    },
  }
}
</script>

<style lang="scss">
.acount-center-left, .acount-dynamic{
  @include contentPannel;
  height: 100%;
}
.acount-center-left{
  .avatar-wraper{
    text-align: center;
    p{
      color: #999;
    }
  }
  h3{
    font-size: 1.5em;
    margin: 20px 0 0;
  }
  .detail{
    margin: 20px 0;
    p{
      display: flex;
      align-items: center;
      margin: 6px 0;
    }
    svg{
      margin-right: 10px;
    }
  }
  .tags-wraper{
    margin: -5px;
    .ant-tag{
      margin: 5px;
    }
  }
}
.acount-dynamic{
  h2{
    margin: 0 0 30px;
  }
  .gray{
    color: #999;
  }
}
</style>