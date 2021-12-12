<template>
    <div class="addPlayers col">
        <div 
        v-for="(item,key) in newPlayers"
        class="addPlayers-item flex flex-align-center mb-10"
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
            @clicked="deletePlayer(key)"
            class="addPlayers-item__delete ml-10"
            />
        </div>
        

        <div class="addPlayers-panel col mt-15">
            <div 
            v-if="canAddingPlayer"
            @click="addPlayer"
            class="btn mb-10">
                Добавить игрока
            </div>
            <div 
            @click="savePlayers"
            :class="{ 'btn--disable' : !allFieldFilled }"
            class="btn">
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
            }
        },

        data: () => {
            return {
                newPlayers: []
            }
        },
        
        computed: {
            ...mapState({
                maxPlayers: state => state.maxPlayers
            }),

            canAddingPlayer() {
                return !(this.newPlayers.length >= this.maxPlayers) 
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
                let newPlayer = {
                    "title": '',
                    "balance": 15000000
                }
                this.newPlayers.push(newPlayer)
            },

            deletePlayer(key) {
                let item = this.newPlayers[key]
                console.log(item)
                let index = this.newPlayers.indexOf(item)
                this.newPlayers.splice(index,1)
            },

            savePlayers() {
                console.log(this.players)
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
                .stroke {
                    stroke: red
                }
            }
        }


    }
</style>