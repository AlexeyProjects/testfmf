<template>
    <div class="">
        <div class="flex-center col">
            <div class="stateTurn title-24 pa-15 mb-20">
                Ходит игрок {{ players[turnPlayer].title }} с позиции {{ players[turnPlayer].position }}
            </div>
            
            <div 
            @click="showTransfering"
            class="btn btn--white mb-10">
                Передать монеты
            </div>

            <div 
            @click="roll"
            class="btn btn--white mb-25">
                Кинуть кости
            </div>
            
            <div class="title-24">
                Выпало: {{ rollNumber }}
            </div>
        </div>
        

        <VueDragResize 
        :isActive="false"  :w="changeLog.width" :h="changeLog.height" :y="changeLog.top" :x="changeLog.left"  v-on:resizing="resize" v-on:dragging="resize">
            <div class="log pa-15">
                <div class="mb-10">
                    История событий
                </div>
                <div class="">
                    <transition-group name="list-complete" tag="p">
                        <div 
                        v-for="(item, key) in log"
                        :key="key"
                        v-html="item"
                        class="mb-15 list-complete-item">
                        
                        </div>
                    </transition-group>
                    
                </div>
            </div>
        </VueDragResize>

        <Popup
        :title="'Перевод монет другому игроку'"
        @closePopup="closeTransfering"
        :isShown="showingTransfering"
        >
            <Transfering
            :players="players"
            :currentStepPlayer="currentStepPlayer"
            @closePopup="closeTransfering"
            @transferedCoin="transferedCoin"
            ></Transfering>
        </Popup>

        
             
    </div>
</template>

<script>
    import { mapActions, mapState } from 'vuex'
    import VueDragResize from 'vue-drag-resize'
    import Vue from 'vue'


    import Popup from '@/components/popup'
    import Transfering from '@/components/transfering'

    import filterMixin from '@/mixins/filters'

    var moment = require('moment'); // require
    export default {
        name: "game",

        mixins: [
            filterMixin
        ],

        components: {
            VueDragResize,
            Popup,
            Transfering
        },

        props: {
            players: {
                type: Array,
                default: () => []
            },

            savedLog: {
                type: Array,
                default: () => []
            },

            savedTurn: {
                type: Number,
                default: null
            },

            gameContining: {
                type: Boolean,
                default: false
            },

            savedRollNumber: {
                type: Number,
                default: null
            }
        },

        watch: {
            turnPlayer(val) {

                if ( val === this.players.length ) {
                    this.turnPlayer = 0
                }

                if ( this.currentStepPlayer.losed ) {
                    this.turnPlayer += 1
                }

                let stringForLocal = JSON.stringify(val)
                localStorage.setItem('turnPlayer', stringForLocal)
            },

            countPlayersInGame(val) {
                if ( val === 1 ) {
                    let winner = null

                    this.players.forEach((item) => {
                        if ( !item.losed ) {
                            winner = item
                        }
                    })
                    this.$emit('gameOver',winner)
                }
            },

            log: {
                deep: true,
                handler(val) {
                    let stringForLocal = JSON.stringify(val)
                    localStorage.setItem('log', stringForLocal)
                }
            },

            rollNumber(val) {
                let savedRollNumber = JSON.stringify(val)
                localStorage.setItem('rollNumber', savedRollNumber)
            }

        },

        data: () => {
            return {
                turnPlayer: 0,
                rollNumber: 0,
                log: [],
                countPlayersInGame: 0,
                changeLog: {
                    width: 350,
                    height: 500,
                    top: 0,
                    right: 0
                },
                showingTransfering: false
                
            }
        },

        methods: {
            roll() {           
                this.rollNumber = Math.floor(Math.random() * (this.maxStep - 1 + 1) + 1)
                this.playerChangePosition(this.rollNumber)
                this.turnPlayer += 1
            },

            playerChangePosition(position) {
                let player = this.players[this.turnPlayer]
                let oldPosition = player.position

                this.players[this.turnPlayer].position += position

                if ( player.position >= this.fieldLength ) {
                    let firstNumber = this.fieldLength - oldPosition
                    player.position = position - firstNumber
                }

                let newMessage = ''
                this.playerChangeBalance(player)

                let positionField = player.position
                let action = this.field[positionField].action
                let value = this.field[positionField].value
                let actionTitle = ''
                switch (action) {
                    
                    case 'append':
                        actionTitle = 'Присвоено'
                        break;
                    case 'subtract':
                        actionTitle = 'Заплачено'
                        break;
                }
                newMessage = `
                    Игрок ${player.title} выбросил ${this.rollNumber} и переместилась с позиции ${oldPosition} на позицию ${player.position}. ${actionTitle} <span class="p--${ actionTitle === 'Присвоено' ?'green':'red'}">${this.numberViewing(value)}</span> Текущий баланс ${this.numberViewing(+player.balance)}
                `
                this.logAddMessage(newMessage)
                
            },
            
            logAddMessage(message) {
                var timeToShow = moment().format('hh:mm:ss');  //9:02am
                let newMessage = `[${timeToShow}] ${message} ` 
                this.log.push(newMessage)
                function scrollToBottom() {
                    let height = document.querySelector('.log').scrollHeight
                    document.querySelector('.log').scrollTop = height
                    
                }
                setTimeout(
                    scrollToBottom, 500
                )
                scrollToBottom()
                
            },

            playerChangeBalance(player) {
                let position = +player.position
                let action = this.field[position].action
                let value = this.field[position].value
                if ( action === 'append' ) {            
                    player.balance += value
                }
                else if ( action === 'subtract' ) {
                    player.balance -= value
                    
                    if ( player.balance <= this.maxNegativeBalance ) {
                        this.playerLose(player)
                    }
                }
            },

            resize(newRect) {
                this.changeLog.width = newRect.width;
                this.changeLog.height = newRect.height;
                this.changeLog.top = newRect.top;
                this.changeLog.left = newRect.left;
            },

            playerLose(player) {
                Vue.set(player, 'losed', true)
                this.countPlayersInGame -= 1
                
            },

            showTransfering() {
                this.showingTransfering = true
            },

            closeTransfering() {
                this.showingTransfering = false
            },

            transferedCoin(player, summ) {
                this.currentStepPlayer.balance -= +summ
                player.balance += +summ
                let newMessage = `
                Игрок ${this.currentStepPlayer.title} перевел <span class="p--green">${this.numberViewing(+summ)}</span> монет игроку ${player.title}
                `
                this.logAddMessage(newMessage)
            }

        },

        computed: {
            ...mapState({
                maxStep: state => state.maxStep,
                field: state => state.field,
                maxNegativeBalance: state => state.maxNegativeBalance 
            }),

            fieldLength() {
                return this.field.length
            },

            currentStepPlayer() {
                return this.players[this.turnPlayer]
            }
            
        },

        filter: {
            
        },

        mounted() {
            this.countPlayersInGame = this.players.length
            
            if ( this.gameContining ) {
                this.log = this.savedLog
                this.turnPlayer = this.savedTurn
                this.rollNumber = this.savedRollNumber
            }
        }


    }
</script>

<style lang="scss" scoped>
    .log {
        width: 100%;
        height: 100%;
        background-color: #ffffff;
        border: 1px solid #000;
        border-radius: 8px;
        overflow: auto;
        -webkit-box-shadow: 0px 0px 18px -3px rgba(34, 60, 80, 0.2);
        -moz-box-shadow: 0px 0px 18px -3px rgba(34, 60, 80, 0.2);
        box-shadow: 0px 0px 18px -3px rgba(34, 60, 80, 0.2);
    }

    .stateTurn {
        background-color: #fff;
        border-radius: 4px;
        -webkit-box-shadow: 0px 0px 18px -3px rgba(34, 60, 80, 0.2);
        -moz-box-shadow: 0px 0px 18px -3px rgba(34, 60, 80, 0.2);
        box-shadow: 0px 0px 18px -3px rgba(34, 60, 80, 0.2);
    }
    .list-complete-item {
        transition: all .4s;
        display: inline-block;
        margin-right: 10px;
    }
        .list-complete-enter, .list-complete-leave-to {
        opacity: 0;
        transform: translateY(30px);
    }
        .list-complete-leave-active {
        position: absolute;
    }
</style>