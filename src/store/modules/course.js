import axios from '../../utils/axios'

export default {
  state: {
    category: [],
    list: []
  },
  mutations: {
    setCategory(state, payload){
      state.category = payload;
    },
    setList(state, payload){
      state.list = payload
    },
    deleteCourse(state, index){
      state.list.splice(index, 1);
    }
  },
  actions: {
    async getCategory({ commit }){
      const res = await axios.get('/api/category?type=course');
      if (res.data && res.data.code === 20000) {
        commit('setCategory', res.data.data);
      }
    },
    async getList({ commit }){
      const res = await axios.get('/api/course')
      if (res.data && res.data.code === 20000) {
        commit('setList', res.data.data);
      }
    }
  }
}