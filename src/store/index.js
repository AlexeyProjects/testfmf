import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    maxPlayers: 5,
    maxStep: 6,
    maxNegativeBalance: -5000000,
    field: [],
    newPlayer: {
      "title": '',
      "balance": 15000000,
      "position": 0,
      "losed": false
    }
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

