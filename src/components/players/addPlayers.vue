<template>
    <div class="addPlayers col">
        <transition-group class="col" name="list-complete" tag="div">
            <div 
            v-for="(item,key) in newPlayers"
            class="addPlayers-item list-complete-item flex flex-align-center mb-10"
            :key="key"
            >
                <input 
                class="input"
                v-model="item.title"
                placeholder="Введите имя игрока" 
                type="text">
                <div class="">

                </div>
                <CloseIcon
                v-if="canDeletePlayers"
                @clicked="deletePlayer(key)"
                class="addPlayers-item__delete ml-10"
                />
            </div>
        </transition-group
        

        <div class="addPlayers-panel col mt-15">

            <div 
            v-if="canAddingPlayer"
            @click="addPlayer"
            class="btn btn--white mb-10">
                Добавить игрока
            </div>

            <div 
            @click="savePlayers"
            :class="{ 'btn--disable' : !allFieldFilled }"
            class="btn btn--white">
                Сохранить
            </div>

        </div>
        
    </div>    
</template>

<script>
    import Vue from 'vue';
    import { mapState } from 'vuex'

    import CloseIcon from '@/components/icons/close'

    export default {
        name: 'addPlayers',

        components: {
            CloseIcon
        },

        props: {
            players: {
                type: Array,
                default: () => Array
            },

            gameStarted: {
                type: Boolean,
                default: true
            }
        },

        data: () => {
            return {
                newPlayers: []
            }
        },
        
        computed: {
            ...mapState({
                maxPlayers: state => state.maxPlayers,
                newPlayer: state => state.newPlayer
            }),

            canAddingPlayer() {
                return !(this.newPlayers.length >= this.maxPlayers) 
            },

            canDeletePlayers() {
                return !this.gameStarted
            },

            allFieldFilled() {
                function filled(element) {
                    return element.title != ''
                }
                return this.newPlayers.every(filled)
            }
        },

        methods: {
            addPlayer() {
                let newPlayer = {}
                Object.assign(newPlayer, this.newPlayer)
                this.newPlayers.push(newPlayer)
            },

            deletePlayer(key) {
                let item = this.newPlayers[key]
                let index = this.newPlayers.indexOf(item)
                this.newPlayers.splice(index,1)
            },

            savePlayers() {
                this.newPlayers.forEach((item, index) => {
                    item.id = index
                })
                this.$emit('savePlayers', this.newPlayers)
            }
        },

        mounted() {
            this.newPlayers = this.players.slice()
        }
    }
</script>

<style lang="scss" scoped>
    .addPlayers {

        &-item {
            &__delete {
                width: 1.4rem;

            }
        }


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