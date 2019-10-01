import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import antUI from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import components from '@/components';
import directive from '@/directive';
import hasPermission from '@/utils/permission'

Vue.use(antUI);
Vue.use(components);
Vue.use(directive);
Vue.config.productionTip = false;
Vue.prototype.$auth = hasPermission;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
