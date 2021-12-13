<template>
    <div class="players pa-15">
        
            <transition-group class="players-list col" name="list-complete" tag="div">
                <Player
                v-show="!item.losed"
                v-for="(item,key) in players"
                :key="key"
                class="mb-5 list-complete-item flex"
                :info="item"
                ></Player>
            </transition-group>
        
        <div class="players-panel">
            <div 
            @click="showPopup"
            class="btn btn--white mt-15">
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
        background-color: #fff;
        border-radius: 4px;
        -webkit-box-shadow: 0px 0px 18px -3px rgba(34, 60, 80, 0.2);
        -moz-box-shadow: 0px 0px 18px -3px rgba(34, 60, 80, 0.2);
        box-shadow: 0px 0px 18px -3px rgba(34, 60, 80, 0.2);
    }

    .list-complete-item {
        transition: all .4s;
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