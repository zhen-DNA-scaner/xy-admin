import axios from '../../utils/axios'

export default {
  state: {
    list: [],
    total: 0
  },
  mutations: {
    setList(state, payload){
      state.list = payload.data;
      state.total = payload.total;
    },
    unshift(state, payload){
      state.list.unshift(payload);
    }
  },
  actions: {
    async getFiles({commit}, page){
      const res = await axios.get(`/api/cloud?page=${page}`);
      commit('setList', res.data);
    }
  }
}