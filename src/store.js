import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      roles: ['admin']
    }
  },
  getters: {
    roles: state => state.user ? state.user.roles : []
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
