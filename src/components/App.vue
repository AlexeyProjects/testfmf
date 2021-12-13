<template>
  <div id="app">
      <div class="container flex-center col">
        <Players
        v-if="!winner"
        :players="players"
        @showPopup="showingAddPlayer"
        />

        <Game
        :savedLog="log"
        :gameContining="gameContining"
        :savedTurn="turnPlayer"
        :savedRollNumber="savedRollNumber"
        v-if="gameStarted && !offerContinueGame"
        @gameOver="gameOver"
        :players="players"
        >

        </Game>

        <div 
        v-if="!gameStarted && winner"
        class="winer mb-15 title-24">
          Победитель {{ winner.title }} с балансом {{ numberViewing(+(winner.balance)) }}
        </div>

        <div 
        v-if="offerContinueGame && gameStarted"
        class="col flex-align-center">
          <div class="mb-10">
            Хотите продолжить незавершенную игру?
          </div>

          <div class="">
            <div 
            @click="continueGame"
            class="btn btn--white mr-10">Да</div>
            <div 
            @click="refreshGameData"
            class="btn btn--white">Нет</div>
          </div>

        </div>

        <StartPanel
        v-if="!gameStarted && !offerContinueGame"
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

import filerMixin from '@/mixins/filters'

export default {
  name: 'App',
  
  mixins: [
    filerMixin
  ],

  components: {
    Players,
    Popup,
    AddPlayers,
    StartPanel,
    Game
  },

  watch: {
    
    gameStarted(val) {
      let stringForLocal = JSON.stringify(val)
      localStorage.setItem('gameStarted', stringForLocal)
    },

    players: {
      deep: true,
      handler(val) {
        let stringForLocal = JSON.stringify(val)
        localStorage.setItem('players', stringForLocal)

        if ( val.length >= 2 ) {
          this.startTitle = 'Начать игру'
        }
        else {
          this.startTitle = 'Чтобы начать игру нужно добавить более 2ух игроков'
        }
      }
    },


  },

  data: () => {
    return {
      gameStarted: false,
      players: [],
      winner: '',
      startTitle: 'Чтобы начать игру нужно добавить более 2ух игроков',
      showAddPlayer: false,
      offerContinueGame: false,
      turnPlayer: 0,
      log: [],
      gameContining: false
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
      this.gameStarted = false
      this.players = []
      this.winner = ''

      if ( this.offerContinueGame ) {
        this.offerContinueGame = false
      } 

      this.showingAddPlayer()
    },

    gameOver(player) {
      this.winner = player
      this.gameStarted = false
      this.startTitle = 'Нажмите чтобы начать игру заного'
    },

    checkSavingGame() {
      let localSavingState = JSON.parse(localStorage.getItem('gameStarted'))
      if ( localSavingState ) {
        this.gameStarted = true
        this.offerContinueGame = true
      }
    },

    continueGame() {
      
      let localPlayers = JSON.parse(localStorage.getItem('players'))
      let localTurnPlayer = JSON.parse(localStorage.getItem('turnPlayer'))
      let localLog = JSON.parse(localStorage.getItem('log'))
      let savedRollNumber = JSON.parse(localStorage.getItem('rollNumber'))

      this.savedRollNumber = savedRollNumber
      this.players = localPlayers
      this.log = localLog
      this.turnPlayer = localTurnPlayer

      this.offerContinueGame = false
      this.gameStarted = true
      this.gameContining = true
    }
  },

  mounted() {
    this.getField()
    this.checkSavingGame()
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
