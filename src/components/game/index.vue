<template>
    <div class="">
        <div class="">
            <div class="stateTurn">
                Ходит игрок: {{ players[turnPlayer].title }} с позиции {{ players[turnPlayer].position }}
            </div>
            <div class="">
                Выпало: {{ rollNumber }}
            </div>

            <div class="log pa-15">
                <div class="">
                    История событий
                </div>
                <div class="">
                    <transition-group name="list-complete" tag="p">
                        <div 
                        v-for="(item, key) in log"
                        :key="key"
                        class="mb-15 list-complete-item">
                            {{ item }}
                        </div>
                    </transition-group>
                    
                </div>
            </div>

            <div 
            @click="roll"
            class="btn">
                Кинуть кости
            </div>
            
        </div>
    </div>
</template>

<script>
    import { mapActions, mapState } from 'vuex'

    export default {
        name: "game",

        props: {
            players: {
                type: Array,
                default: () => []
            }
        },

        watch: {
            turnPlayer(val) {
                if ( val === this.players.length ) {
                    this.turnPlayer = 0
                }
            }
        },

        data: () => {
            return {
                turnPlayer: 0,
                rollNumber: 0,
                log: []
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
                newMessage = `Игрок ${player.title} выбросил ${this.rollNumber} и переместилась с позиции ${oldPosition} на позицию ${player.position}. Текущий баланс ${player.balance}`
                this.logAddMessage(newMessage)
            },
            
            logAddMessage(message) {
                this.log.push(message)
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
                let playerId = player.id
                let position = +player.position
                let action = this.field[position].action
                let value = this.field[position].value
                if ( action === 'append' ) {
                    
                    this.players[playerId].balance += value
                    console.log(this.players[playerId].balance)
                }
                else if ( action === 'subtract' ) {
                    this.players[playerId].balance -= value
                    console.log(this.players[playerId].balance)
                }
            }
        },

        computed: {
            ...mapState({
                maxStep: state => state.maxStep,
                field: state => state.field
            }),

            fieldLength() {
                return this.field.length
            }
        }


    }
</script>

<style lang="scss" scoped>
    .log {
        width: 30rem;
        max-height: 45rem;
        height: 45rem;
        background-color: #ffffff;
        position: absolute;
        right: 0;
        bottom: 0;
        border: 1px solid #000;
        border-radius: 8px;
        overflow: auto;
    }
    .list-complete-item {
        transition: all .4s;
        display: inline-block;
        margin-right: 10px;
    }
        .list-complete-enter, .list-complete-leave-to
        /* .list-complete-leave-active до версии 2.1.8 */ {
        opacity: 0;
        transform: translateY(30px);
    }
        .list-complete-leave-active {
        position: absolute;
    }
</style>