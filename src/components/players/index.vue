<template>
    <div class="players">
        <div class="players-list">

            <Player
            v-for="(item,key) in players"
            :key="key"
            class="mb-5"
            :info="item"
            ></Player>
        </div>
        <div class="players-panel">
            <div 
            @click="showPopup"
            class="btn mt-15">
                Добавить игроков
            </div>
        </div>
    </div>
</template>

<script>
import Player from './player'
export default {
    name: 'players',

    components: {
        Player
    },
    
    props: {
        players: {
            type: Array,
            default: () => []
        }
    },

    methods: {
        showPopup() {
            this.$emit('showPopup')
        }
    }
}
</script>

<style lang="scss" scoped>
    .players {
        &-list {

        }

        &-panel {

        }
    }
</style>