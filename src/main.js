import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import antUI from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import components from '@/components';
import directive from '@/directive';
import hasPermission from '@/utils/permission';
import VueI18n from 'vue-i18n';
import axios from '@/utils/axios';
import storage from '@/utils/storage';
const mock = () => import('../mock');

const isDev = process.env.NODE_ENV === 'development';

if (isDev) mock();
Vue.use(antUI);
Vue.use(components);
Vue.use(directive);
Vue.use(VueI18n);
Vue.config.productionTip = false;
Vue.prototype.$auth = hasPermission;
Vue.prototype.$axios = axios;
Vue.prototype.$storage = storage;

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