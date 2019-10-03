import Vue from 'vue'
import Vuex from 'vuex'
import storage from './utils/storage'

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
    }
  },
  mutations: {
    setUser(state, payload){
      state.user = payload;
    }
  },
  actions: {
    async getUser({commit}){
      // const res = await getUser();
      // commit('setUser', res.data);
      commit('setUser', { roles: ['admin'] });
    }
  }
})
