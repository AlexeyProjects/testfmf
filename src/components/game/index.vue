<template>
    <div class="">
        <div class="">
            <div class="stateTurn">
                Ходит игрок: {{ players[turnPlayer].title }}
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
                rollNumber: 0
            }
        },

        methods: {
            roll() {
                this.rollNumber = Math.floor(Math.random() * (12 - 1 + 1) + 1)
                console.log(this.rollNumber)
                this.turnPlayer += 1
            }
        }


    }
</script>

<style lang="scss" scoped>

</style>