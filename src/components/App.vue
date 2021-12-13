<template>
  <div id="app">
      <div class="container flex-center col">
        <Players
        :players="players"
        @showPopup="showingAddPlayer"
        />

        <Game
        v-if="gameStarted"
        @gameOver="gameOver"
        :players="players"
        >

        </Game>
        <div 
        v-if="!gameStarted && winner"
        class="winer mb-15 title-24">
          Победитель {{ winner.title }} с балансом {{ winner.balance }}
        </div>
        <StartPanel
        v-if="!gameStarted"
        :startTitle="startTitle"
        :canStartGame="canStartGame"
        :canRefreshGame="canRefreshGame"
        @startNullGame="startNullGame"
        @refreshGameData="refreshGameData"
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
          :gameStarted="gameStarted"
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
import Game from '@/components/game'

export default {
  name: 'App',

  components: {
    Players,
    Popup,
    AddPlayers,
    StartPanel,
    Game
  },

  watch: {
    canStartGame(val) {
      if (!val) {
        this.startTitle = 'Чтобы начать игру нужно добавить более 2ух игроков'
      }

      if (val) {
        this.startTitle = 'Начать игру'
      }
    }
  },

  data: () => {
    return {
      gameStarted: false,
      players: [
        { "id": 0,
          "title": "aleksey",
          "balance": 100000,
          "position": 0,
          "losed": false
        },

        { 
          "id": 1,
          "title": "valeria",
          "balance": 15000000,
          "position": 0,
          "losed": false
        }
      ],
      winner: '',
      startTitle: 'Начать игру',
      showAddPlayer: false
    }
    
  },

  computed: {
    canStartGame() {
      return this.players.length >= 2
    },

    canRefreshGame() {
      if ( this.winner && this.gameOver )
      return true
    }
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
    },

    startNullGame() {
      this.gameStarted = true
    },

    refreshGameData() {
      console.log('refresh')
      this.players = []
      this.winner = ''
      this.showingAddPlayer()
    },

    gameOver(player) {
      console.log(`Победитель ${player.title}`)
      this.winner = player
      this.gameStarted = false
      this.startTitle = 'Нажмите чтобы начать игру заного'
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
