<template>
  <a-layout id="layout-default">
    <a-layout-sider
      :trigger="null"
      collapsible
      v-model="collapsed"
      class="layout-leftnav"
    >
      <div class="logo">
        <img :src="require('../../assets/img/logo-mini.svg')" />
        <b v-show="!collapsed">{{ $t('logo') }}</b>
      </div>
      <a-menu
      class="menu"
      v-model="currentMenu"
      :openKeys.sync="currentOpenMenu"
      mode="inline"
      theme="dark"
      :inlineCollapsed="collapsed"
      @click="changeMenuItem"
    >
      <a-sub-menu key="dashboard">
        <span slot="title"><a-icon type="dashboard" /><span>{{ $t('menu.dashboard') }}</span></span>
        <a-menu-item key="">{{ $t('menu.analysis') }}</a-menu-item>
        <!-- <a-menu-item key="sub1-1-1"><router-link to="/">{{ $t('menu.analysis') }}</router-link></a-menu-item> -->
        <!-- <a-menu-item key="sub1-1-2">{{ $t('menu.monitor') }}</a-menu-item>
        <a-menu-item key="sub1-1-3">{{ $t('menu.workbench') }}</a-menu-item> -->
      </a-sub-menu>
      <a-sub-menu key="sub2">
        <span slot="title"><a-icon type="form" /><span>{{ $t('menu.form') }}</span></span>
        <a-menu-item key="sub2-1-1">{{ $t('menu.formbase') }}</a-menu-item>
        <a-menu-item key="sub2-1-2">{{ $t('menu.formstepbystep') }}</a-menu-item>
        <a-menu-item key="sub2-1-3">{{ $t('menu.formsenior') }}</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub3">
        <span slot="title"><a-icon type="table" /><span>{{ $t('menu.list') }}</span></span>
        <a-menu-item key="sub3-1-1">{{ $t('menu.listsearch') }}</a-menu-item>
        <a-menu-item key="sub3-1-2">{{ $t('menu.querytabel') }}</a-menu-item>
        <a-menu-item key="sub3-1-3">{{ $t('menu.liststandard') }}</a-menu-item>
        <a-menu-item key="sub3-1-4">{{ $t('menu.listcard') }}</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub4">
        <span slot="title"><a-icon type="pic-left" /><span>{{ $t('menu.detail') }}</span></span>
        <a-menu-item key="sub4-1-1">{{ $t('menu.detailbase') }}</a-menu-item>
        <a-menu-item key="sub4-1-2">{{ $t('menu.detailsenior') }}</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub5">
        <span slot="title"><a-icon type="check-circle" /><span>{{ $t('menu.result') }}</span></span>
        <a-menu-item key="sub5-1-1">{{ $t('menu.success') }}</a-menu-item>
        <a-menu-item key="sub5-1-2">{{ $t('menu.fail') }}</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub6">
        <span slot="title"><a-icon type="warning" /><span>{{ $t('menu.exception') }}</span></span>
        <a-menu-item key="sub6-1-1">403</a-menu-item>
        <a-menu-item key="sub6-1-2">404</a-menu-item>
        <a-menu-item key="sub6-1-3">500</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="account">
        <span slot="title"><a-icon type="user" /><span>{{ $t('menu.personal') }}</span></span>
        <a-menu-item key="center">{{ $t('menu.personalcenter') }}</a-menu-item>
        <a-menu-item key="setting">{{ $t('menu.personalsetting') }}</a-menu-item>
      </a-sub-menu>
      <a-menu-item v-if="$auth(['admin'])" key="permission">
        <a-icon type="key" /><span>{{ $t('menu.permission') }}</span>
        <!-- <router-link to="/permission"><a-icon type="key" /><span>{{ $t('menu.permission') }}</span></router-link> -->
      </a-menu-item>
    </a-menu>
    </a-layout-sider>
    <a-layout class="layout-header-width-content">
      <a-layout-header class="header-nav">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="()=> collapsed = !collapsed"
        />
        <div class="right-wraper">
          <div ref="search" class="search-wraper">
            <a-icon class="icon" type="search" @click="() => searchExtended = true" />
            <dropdown slot="content" class="search-input-wraper">
              <input v-model="searchKey" :class="searchSelectClass" placeholder="站内搜索" @input="getSearchRes" />
              <ul v-show="searchKey" class="search-tips" slot="content">
                <li v-show="searchList.length===0" class="result-none">暂无结果</li>
                <li v-for="item in searchList" :key="item._id">{{item.title}}</li>
              </ul>
            </dropdown>
          </div>
          <a-tooltip class="right-icon-wraper">
            <template slot='title'>使用文档</template>
            <a href="https://github.com/Zepeng-Zheng/xy-admin" target="_blank">
              <a-icon class="icon" type="question-circle" />
            </a>
          </a-tooltip>
          <dropdown class="right-icon-wraper">
            <a-badge class="bell-badge" :count="count">
              <a-icon class="icon" type="bell" />
            </a-badge>
            <div slot="content" class="message-container">
              <a-tabs defaultActiveKey="notice">
                <a-tab-pane :tab="`通知 (${noticeCount})`" key="notice">
                  <template v-if="notice.length > 0">
                    <ul class="message-ul notice-wraper">
                      <li v-for="item in notice" :key="item._id" :title="item.title">
                        <span :class="['label', item.type]"><a-icon :type="mapIcons[item.type]" /></span>
                        <div>
                          <h4>{{item.title}}</h4>
                          <p>{{item.createTime}}</p>
                        </div>
                      </li>
                    </ul>
                    <div class="bell-more-wraper">
                      <span @click.stop="() => { noticeCount = 0; notice = []; }">全部已读</span>
                      <router-link to="/notice">查看更多</router-link>
                    </div>
                  </template>
                  <data-none v-else><p>没有通知哟</p></data-none>
                </a-tab-pane>
                <a-tab-pane :tab="`消息 (${messageCount})`" key="message">
                  <template v-if="message.length > 0">
                    <ul class="message-ul message-wraper">
                      <li v-for="item in message" :key="item._id">
                        <a-avatar class="avatar" :src="item.user.avatarUrl"/>
                        <div>
                          <h4>{{item.user.nickName}} {{item.type === 'reply' ? '回复了你' : '评论了你'}}</h4>
                          <p>{{item.content}}</p>
                          <p>{{item.createTime}}</p>
                        </div>
                      </li>
                    </ul>
                    <div class="bell-more-wraper">
                      <span @click.stop="() => { messageCount = 0; message = []; }">全部已读</span>
                      <router-link to="/message">查看更多</router-link>
                    </div>
                  </template>
                  <data-none v-else><p>没有消息哟</p></data-none>
                </a-tab-pane>
                <a-tab-pane :tab="`待办 (${todoCount})`" key="todo">
                  <template v-if="todo.length > 0">
                    <ul class="message-ul todo-wraper">
                      <li v-for="item in todo" :key="item._id">
                        <div class="title-wraper">
                          <h4>{{item.title}}</h4>
                          <a-tag :color="mapTodoStatus[item.status]">{{mapTodoStatusText[item.status]}}</a-tag>
                        </div>
                        <p>{{item.creator.nickName}}提交于{{item.createTime}}，{{item.doer.nickName}}需在{{item.deathLine}}前完成。</p>
                      </li>
                    </ul>
                    <div class="bell-more-wraper">
                      <span @click.stop="() => { todoCount = 0; todo = []; }">全部已读</span>
                      <router-link to="/todo">查看更多</router-link>
                    </div>
                  </template>
                  <data-none v-else><p>事情都干完了哟</p></data-none>
                </a-tab-pane>
              </a-tabs>
            </div>
          </dropdown>
          <a-dropdown class="avatar-wraper">
            <div>
              <a-avatar class="avatar" size="small" icon="user" :src="user.avatarUrl" />
              {{ user.nickName || user.email }}
            </div>
            <a-menu slot="overlay" @click="extendAccount">
              <a-menu-item key="user">
                <router-link to="/center">
                  <a-icon type="user" /> 个人中心
                </router-link>
              </a-menu-item>
              <a-menu-item key="setting">
                <router-link to="/setting">
                  <a-icon type="setting" /> 个人设置
                </router-link>
              </a-menu-item>
              <a-menu-divider />
              <a-menu-item key="logout">
                <a-icon type="logout" /> 退出
              </a-menu-item>
            </a-menu>
          </a-dropdown>
          <a-dropdown class="right-icon-wraper language-wraper">
            <a-icon class="icon" type="global" />
            <a-menu slot="overlay" @click="({key}) => $i18n.locale=key">
              <a-menu-item key="zh-CN">
                <span role="img" aria-label="简体中文">🇨🇳 简体中文</span>
              </a-menu-item>
              <a-menu-item key="zh-HK">
                <span role="img" aria-label="繁体中文">🇭🇰 繁體中文</span>
              </a-menu-item>
              <a-menu-item key="en-US">
                <span role="img" aria-label="English">🇺🇸 English</span>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </div>
      </a-layout-header>
      <a-layout-content class="layout-content">
        <slot></slot>
        <footer>
          Copyright <a-icon type="copyright" /> 2019 小月IT工作室出品
        </footer>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import debounce from 'lodash/debounce';
import { getNotice, getMessage, getTodo, search } from '@/utils/api';
export default {
  mounted(){
    const that = this;
    const mapMessageList = ['notice', 'message', 'todo'];
    const mapMessageCount = ['noticeCount', 'messageCount', 'todoCount'];

    Promise.all([
      getNotice(),
      getMessage(),
      getTodo(),
    ]).then(res => {
      res.forEach((v, i) => {
        if (v.data.data) {
          that[mapMessageCount[i]] = v.data.data.count;
          that[mapMessageList[i]] = v.data.data.list || [];
        }
      })
    })

    // 设置左边菜单初始化高亮
    setTimeout(()=>{
      const keyPath = this.$router.currentRoute.path.split('/');
      keyPath.shift();
      this.currentOpenMenu = [keyPath[0] || 'dashboard'];
      this.currentMenu = [keyPath[1] || ''];
    }, 1000)
  },
  data(){
    return {
      collapsed: false,
      searchExtended: false,
      searchKey: '',
      searchList: [],
      notice: [],
      noticeCount:0,
      message: [],
      messageCount: 0,
      todo: [],
      todoCount: 0,
      mapIcons: {
        'warning': 'warning',
        'info': 'exclamation-circle',
        'danger': 'close-circle',
        'success': 'check-circle',
        '': 'question-circle'
      },
      mapTodoStatus: {
        'undo': 'red',
        'doing': 'orange',
        'done': 'green'
      },
      mapTodoStatusText: {
        'undo': '未开始',
        'doing': '进行中',
        'done': '已完成'
      },
      currentMenu: [],
      currentOpenMenu: []
    }
  },
  computed: {
    searchSelectClass(){
      return ['search-select', this.searchExtended ? 'extended' : ''];
    },
    count(){
      return this.noticeCount + this.messageCount + this.todoCount;
    },
    user(){
      let user = this.$store.getters && this.$store.getters.user;
      if (!user) user = this.$storage.get('user') || {};
      return user;
    }
  },
  watch: {
    searchExtended(extended){
      if(extended) document.body.addEventListener('click', this.globalClickHandle);
      else document.body.removeEventListener('click', this.globalClickHandle);
    }
  },
  methods: {
    // 全局点击收起搜索框
    globalClickHandle(e){
      if(!this.$refs.search.contains(e.target) && this.searchExtended) this.searchExtended = false;
    },
    getSearchRes: debounce(async function(e){
      const k = e.target.value;

      if (!k) {
        this.searchList = [];
        return false;
      }

      const res = await search({ query: {k} });
      this.searchList = res.data.data || [];
    }, 500, { leading: false }),
    extendAccount({ key }){
      switch(key){
        case 'logout':
          this.$storage.clear('user');
          this.$store.commit('setUser', null);
          this.$router.replace('/login');
          break;
      }
    },
    changeMenuItem ({key, keyPath}){
      this.$router.push(`/${key ? keyPath.reverse().join('/') : ''}`);
    }
  }
}
</script>
<style lang="scss">
$navHeight: 50px;

#layout-default{
  height: 100vh;
}
#layout-default .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color .3s;
}

#layout-default .trigger:hover {
  color: #1890ff;
}

#layout-default {
  .logo {
    color: #fff;
    font-size: 20px;
    display: flex;
    align-items: center;
    overflow: hidden;
    word-break:keep-all;
    white-space:nowrap;
    font-weight: 900;
    img{
      height: 30px;
      margin: 16px 16px 16px 28px;
    }
  }
  footer{
    text-align: center;
    padding: 80px 0 40px;
    color: #999;
  }
}
.layout-leftnav{
  @include scrollbar(4px, rgba(255,255,255,0.3));
}
.layout-header-width-content{
  @include scrollbar(6px);
}
.layout-content{
  margin: 20px; 
  min-height: 280px;
}

#layout-default {
  .header-nav{
    background: #fff;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    box-shadow: 0 1px 4px rgba(0,21,41,.08);
    height: 50px;
    position: relative;
    z-index: 99;
    .icon{
      font-size: 18px;
    }
    .collapse-btn{
      cursor: pointer;
      display: inline-block;
      height: 100%;
      width: 50px;
      text-align: center;
      line-height: 50px;
    }
    .right-wraper{
      display: flex;
      height: 100%;
      align-items: center;
    }
    .right-icon-wraper {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: $navHeight - 5px;
      color: $text-color;
      cursor: pointer;
      text-align: center;
      height: 100%;
      &:hover{
        background-color: rgba(0,0,0,0.03);
      }
    }

    .search-wraper{
      cursor: pointer;
      display: flex;
      align-items: center;
      height: 100%;
      min-width: 45px;
      .icon{
        font-size: 18px;
        display: flex;
        height: 100%;
        width: 100%;
        align-items: center;
        justify-content: center;
        padding-right: 5px;
      }
    }
    .search-input-wraper{
      height: 100%;
      display: flex;
      align-items: center;
    }
    .search-select{
      width: 0px;
      transition: width .2s;
      overflow: hidden;
      border: 0;
      outline: 0;
      border-bottom: solid 1px #eee;
      padding: 5px 0;
      height: 34px;
      &.extended{
        width: 260px;
      }
    }
    .search-tips{
      padding: 4px 0!important;
      width: 260px;
      li{
        padding: 10px 12px;
        word-break: break-all;
        line-height: 1.5;
        &:hover{
          background-color: #e6f7ff;
        }
      }
    }
    .result-none{
      color: $disabled-color;
      text-align: center;
    }
    .bell-badge{
      width: 100%;
    }
    .bell-more-wraper{
      display: flex;
      border-top: solid 1px #eee;
      height: 3em;
      line-height: 3em;
      span{
        color: #666;
        &:hover{
          color: #000;
        }
      }
      a, span{
        flex: 1;
        text-align: center;
      }
    }
    .message-ul{
      list-style: none;
      margin: -15px 0 0;
      padding: 0;
      text-align: left;
      max-height: 300px;
      height: auto!important;
      @include scrollbar;
      li{
        padding: .8em 1.2em;
        display: flex;
        align-items: center;
        border-bottom: solid 1px #eee;
        &:last-of-type{
          border: 0;
        }
        &:hover{
          background-color: rgba(0,0,0,0.02);
        }
      }
      p{
        font-size: 12px;
        color: $text-color-secondary;
        margin: 5px 0 0;
      }
      h4{
        @include lineover;
        margin: 0;
      }
    }
    .notice-wraper{
      .label{
        width: 34px;
        flex: 0 0 34px;
        height: 34px;
        background-color: rgba(0,0,0,0.4);
        border-radius: 50%;
        margin-right: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-size: 18px;
        opacity: .75;
        &.warning{
          background-color: $warning-color;
        }
        &.info{
          background-color: $link-color;
        }
        &.success{
          background-color: $success-color;
        }
        &.danger{
          background-color: $error-color;
        }
      }
    }
    .message-wraper{
      li{
        display: flex;
        align-items: flex-start;
      }
      .avatar{
        margin-right: 10px;
      }
    }
    .todo-wraper{
      li{
        display: block;
      }
      .title-wraper{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      h4{
        margin: 0 10px 5px 0;
      }
    }
    .message-container{
      width: 360px;
    }
    .avatar-wraper{
      margin: 0 15px;
      font-size: $font-size-base - 1px;
      cursor: pointer;
      height: 100%;
      display: flex;
      align-items: center;
      .avatar{
        margin-right: 5px;
      }
    }
    .language-wraper{
      margin-right: 5px;
    }
  }
}
</style>
