import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    maxPlayers: 5,
    maxStep: 6,
    field: []
  },

  mutations: {
    putField(state, field) {
      state.field = field
    }
  },

  actions: {
    async getField() {
        let {data} = await Axios.get('field.json');
        console.log(data)
        this.commit('putField', data)
    }
  },
})

