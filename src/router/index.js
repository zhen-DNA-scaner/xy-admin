import Vue from 'vue'
import Router from 'vue-router'
import routes from './modules'
import hasPermission from '@/utils/permission'
import { isLogin } from '@/utils/auth'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

const whiteList = ['/login'];

// 导航前卫鉴权
router.beforeEach(async(to, from, next) => {
  const inWhiteList = whiteList.includes(to.path);
  if(inWhiteList) return next();
  const islog = isLogin();
  // is logined
  if(islog){
    const routeRoles = to.meta[0] ? to.meta[0].roles : null;
    // // the route is not set permission if meta roles is undefined
    if(routeRoles && routeRoles.length > 0){
      const hasRole = hasPermission(routeRoles);
      if(!hasRole) return next('/403');
    }
  }else{
    return next('/login');
  }
  next();
})

export default router
