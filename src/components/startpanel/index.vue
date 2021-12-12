<template>
    <div class="startpanel">
        <div 
        :class="{ 'btn--disable': !canStartGame }"
        class="btn">
            {{ title }}
        </div>
    </div>
</template>

<script>
    export default {
        name: 'startpanel',

        props: {
            canStartGame: {
                type: Boolean,
                default: false
            }
            
        },

        computed: {
            title() {
                if ( this.canStartGame ) {
                    return 'Начать игру'
                }
                else {
                    return 'Добавьте 2 или более игроков чтобы начать'
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    
</style>