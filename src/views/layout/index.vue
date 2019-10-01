<template>
  <a-layout id="layout-default">
    <a-layout-sider
      :trigger="null"
      collapsible
      v-model="collapsed"
      class="layout-leftnav"
    >
      <div class="logo">
        <img src="img/logo/logo-mini.svg" />
        <b v-show="!collapsed">晓月程序</b>
      </div>
      <a-menu
      class="menu"
      :defaultSelectedKeys="['sub1-1-1']"
      :defaultOpenKeys="['sub1']"
      mode="inline"
      theme="dark"
      :inlineCollapsed="collapsed"
    >
      <a-sub-menu key="sub1">
        <span slot="title"><a-icon type="dashboard" /><span>仪表盘</span></span>
        <a-menu-item key="sub1-1-1"><router-link to="/">分析台</router-link></a-menu-item>
        <a-menu-item key="sub1-1-2">监控台</a-menu-item>
        <a-menu-item key="sub1-1-3">工作台</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub2">
        <span slot="title"><a-icon type="form" /><span>表单页</span></span>
        <a-menu-item key="sub2-1-1">基础表单</a-menu-item>
        <a-menu-item key="sub2-1-2">分步表单</a-menu-item>
        <a-menu-item key="sub2-1-3">高级表单</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub3">
        <span slot="title"><a-icon type="table" /><span>列表页</span></span>
        <a-menu-item key="sub3-1-1">搜索列表</a-menu-item>
        <a-menu-item key="sub3-1-2">查询表格</a-menu-item>
        <a-menu-item key="sub3-1-3">标准列表</a-menu-item>
        <a-menu-item key="sub3-1-4">卡片列表</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub4">
        <span slot="title"><a-icon type="pic-left" /><span>详情页</span></span>
        <a-menu-item key="sub4-1-1">基础详情页</a-menu-item>
        <a-menu-item key="sub4-1-2">高级详情页</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub5">
        <span slot="title"><a-icon type="check-circle" /><span>结果页</span></span>
        <a-menu-item key="sub5-1-1">成功页</a-menu-item>
        <a-menu-item key="sub5-1-2">失败页</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub6">
        <span slot="title"><a-icon type="warning" /><span>异常页</span></span>
        <a-menu-item key="sub6-1-1">403</a-menu-item>
        <a-menu-item key="sub6-1-2">404</a-menu-item>
        <a-menu-item key="sub6-1-3">500</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub7">
        <span slot="title"><a-icon type="user" /><span>个人页</span></span>
        <a-menu-item key="sub7-1-1">个人中心</a-menu-item>
        <a-menu-item key="sub7-1-2">个人设置</a-menu-item>
      </a-sub-menu>
      <a-menu-item v-if="$auth(['admin'])" key="permission">
        <router-link to="/permission"><a-icon type="key" /><span>管理权限页</span></router-link>
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
            <a target="_blank">
              <a-icon class="icon" type="question-circle" />
            </a>
          </a-tooltip>
          <dropdown class="right-icon-wraper">
            <a-badge class="bell-badge" :count="9932">
              <a-icon class="icon" type="bell" />
            </a-badge>
            <div slot="content" class="message-container">
              <a-tabs defaultActiveKey="notice">
                <a-tab-pane :tab="`通知 (3)`" key="notice">
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
                    <router-link class="bell-read-more" to="/notice">查看更多</router-link>
                  </template>
                  <message-none v-else class="mesaage-none"><p>没有通知哟</p></message-none>
                </a-tab-pane>
                <a-tab-pane :tab="`消息 (34)`" key="message">
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
                    <router-link class="bell-read-more" to="/message">查看更多</router-link>
                  </template>
                  <message-none v-else class="mesaage-none"><p>没有消息哟</p></message-none>
                </a-tab-pane>
                <a-tab-pane :tab="`待办 (23)`" key="todo">
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
                    <router-link class="bell-read-more" to="/notice">查看更多</router-link>
                  </template>
                  <message-none v-else class="mesaage-none"><p>事情都干完了哟</p></message-none>
                </a-tab-pane>
              </a-tabs>
            </div>
          </dropdown>
          <a-dropdown class="avatar-wraper">
            <div>
              <a-avatar class="avatar" size="small" :src="'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png'" />
              Zepeng Zheng
            </div>
            <a-menu slot="overlay" @click="extendAccount">
              <a-menu-item key="user">
                <router-link to="/user">
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
            <a-menu slot="overlay">
              <a-menu-item key="zh">
                <span role="img" aria-label="简体中文">🇨🇳 简体中文</span>
              </a-menu-item>
              <a-menu-item key="fan">
                <span role="img" aria-label="繁体中文">🇭🇰 繁体中文</span>
              </a-menu-item>
              <a-menu-item key="en">
                <span role="img" aria-label="English">🇺🇸 English</span>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </div>
      </a-layout-header>
      <a-layout-content class="layout-content">
        <slot></slot>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import debounce from 'lodash/debounce'
export default {
  data(){
    return {
      collapsed: false,
      searchExtended: false,
      searchKey: '',
      searchList: [],
      notice: [],
      message: [],
      todo: []
    }
  },
  computed: {
    searchSelectClass(){
      return ['search-select', this.searchExtended ? 'extended' : ''];
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
      if (!e.target.value) {
        this.searchList = [];
        return false;
      }

      this.searchList = [
        {_id:1, title: e.target.value + '提示1'},
        {_id:2, title: e.target.value + '提示2'},
        {_id:3, title: e.target.value + '提示3'},
      ]
    }, 500, { leading: false }),
    extendAccount(key){
      console.log(key)
    }
  }
}
</script>
<style lang="scss">
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
    img{
      height: 30px;
      margin: 16px 16px 16px 28px;
    }
  }
}
.layout-leftnav{
  @include scrollbar(4px, rgba(255,255,255,0.3));
}
.layout-header-width-content{
  @include scrollbar(6px);
}
.layout-content{
  margin: 24px 16px; 
  padding: 24px;
  background: #fff;
  min-height: 280px;
}
$navHeight: 50px;
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
  .bell-read-more{
    display: block;
    border-top: solid 1px #eee;
    padding: 1em;
  }
  .mesaage-none{
    text-align: center;
    color: #ccc;
    margin: 40px 0 60px;
    svg{
      font-size: 60px!important;
    }
    p{
      color: #ccc;
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
    margin: 0 10px 0 30px;
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
</style>
