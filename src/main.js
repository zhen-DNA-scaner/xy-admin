import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index';
import './registerServiceWorker';
import antUI from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import components from '@/components';
import directive from '@/directive';
import filter from '@/filter';
import hasPermission from '@/utils/permission';
import VueI18n from 'vue-i18n';
import storage from '@/utils/storage';
import axios from '@/utils/axios';

const isDev = process.env.NODE_ENV === 'development';

// if (isDev) {
//   require('../mock');
// }

Vue.use(antUI);
Vue.use(components);
Vue.use(directive);
Vue.use(filter);
Vue.use(VueI18n);
Vue.config.productionTip = false;
Vue.prototype.$auth = hasPermission;
Vue.prototype.$storage = storage;
Vue.prototype.$axios = axios
// 对象储存
Vue.prototype.$cos = `https://${isDev ? 'test' : 'xy'}-1251731895.cos.ap-guangzhou.myqcloud.com/`
// 数据万象
Vue.prototype.$ci = `https://${isDev ? 'test' : 'xy'}-1251731895.picgz.myqcloud.com/`

const i18n = new VueI18n({
  locale: 'zh-CN', // 语言标识, 通过切换locale的值来实现语言切换, this.$i18n.locale
  messages: {
    'zh-CN': require('./utils/lang/zh-CN'),
    'zh-HK': require('./utils/lang/zh-HK'),
    'en-US': require('./utils/lang/en-US')
  }
})

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');