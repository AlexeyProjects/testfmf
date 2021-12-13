<template>
    <div class="">
        <div class="flex flex-align-center flex-jusfy-between mb-10"
        v-show="item != currentStepPlayer"
        v-for="(item,key) in players"
        :key="key"
        >   

            <div class="">
                {{ item.title }}
            </div>
            <input 
            name="transfering"
            v-model="item.value"
            type="radio">
        </div>
        
    </div>
</template>

<script>
    export default {
        name: 'transfering',

        props: {
            players: {
                type: Array,
                default: () => []
            },

            currentStepPlayer: {
                type: Object,
                default: () => {}
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>