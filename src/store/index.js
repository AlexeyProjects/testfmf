import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    maxPlayers: 5
  },

  mutations: {
  },

  actions: {
    async getField() {
        let {data} = await Axios.get('field.json');
        console.log(data)
    }
  },
})

