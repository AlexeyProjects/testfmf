<template>
  <div id="app">
      <div class="container flex-center">
        <Players
        :players="players"
        @showPopup="showingAddPlayer"
        />
        <StartPanel
        :canStartGame="canStartGame"
        >
        </StartPanel>
      </div>
      <Popup
      :title="'Добавление игроков'"
      @closePopup="closingAddPlayer"
      :isShown="showAddPlayer"
      >
        <div class="">
          <AddPlayers
          :players="players"
          @savePlayers="savePlayers"
          ></AddPlayers>          
        </div>
      </Popup>
  </div>
</template>

<script>

import { mapActions, mapState } from 'vuex'

import Players from '@/components/players'
import AddPlayers from '@/components/players/addPlayers'
import Popup from '@/components/popup'
import StartPanel from '@/components/startpanel'
export default {
  name: 'App',

  components: {
    Players,
    Popup,
    AddPlayers,
    StartPanel
  },

  data: () => {
    return {
      players: [],
      showAddPlayer: false
    }
    
  },

  computed: {
    canStartGame() {
      return this.players.length >= 2
    },
  },

  methods: {
    ...mapActions({
      getField: 'getField'
    }),

    createPlayer() {
      let player = {}
    },

    showingAddPlayer() {
      this.showAddPlayer = true
    },

    closingAddPlayer() {
      this.showAddPlayer = false
    },

    savePlayers(newPlayers) {
      this.players = newPlayers
      this.closingAddPlayer()
    }
  },

  mounted() {
    this.getField()
  }
}
</script>

<style lang="scss">
    .container {
      position: relative;
      height: 80vh;
      .players {
        position: absolute;
        right: 0;
        top: 0;
      }
    }
</style>
