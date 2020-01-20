import Vue from 'vue'
import Vuex from 'vuex'
import storage from '../utils/storage'
import course from './modules/course'
import cloud from './modules/cloud'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  getters: {
    roles: state => {
      if(state.user && state.user.roles && state.user.roles.length > 0) return state.user.roles;
      else {
        const user = storage.get('user');
        if (user && user.roles) return user.roles;
      }
      return [];
    },
    user: state => state.user,
  },
  mutations: {
    setUser(state, payload){
      const user = state.user || {};
      state.user = Object.assign(user, payload);
    }
  },
  modules: {
    course,
    cloud
  }
})
