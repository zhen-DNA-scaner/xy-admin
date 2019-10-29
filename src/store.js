import Vue from 'vue'
import Vuex from 'vuex'
import storage from './utils/storage'
import { getUser } from '@/utils/api'

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
  actions: {
    async getUser({commit}){
      const res = await getUser();
      if(res.data && res.data.code === 20000)
        commit('setUser', res.data.data);
    }
  }
})
