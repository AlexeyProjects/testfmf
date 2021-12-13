<template>
    <div class="startpanel">
        <div 
        @click="startNullGame"
        :class="{ 'btn--disable': !canStartGame }"
        class="btn btn--white">
            {{ startTitle }}
        </div>
    </div>
</template>

<script>
    export default {
        name: 'startpanel',

        props: {
            startTitle: {
                type: String,
                default: 'Начать игру'
            },

            canStartGame: {
                type: Boolean,
                default: false
            },

            canRefreshGame: {
                type: Boolean,
                default: false
            }
            
        },

        computed: {

        },

        methods: {
            startNullGame() {
                if ( this.startTitle === 'Начать игру' ) {
                    this.$emit('startNullGame')
                }
                else if ( this.canRefreshGame ) {
                    this.$emit('refreshGameData')
                }
                
            }
        }
    }
</script>

<style lang="scss" scoped>
    
</style>