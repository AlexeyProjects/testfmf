<template>
    <div 
    class="player flex flex-jusfy-between">
        <div class="">
            {{ info.title }}
        </div>
        <div class="">
            {{ info.balance | numberViewing }}
        </div>
    </div>
</template>

<script>
    import filterMixin from "@/mixins/filters"
    export default {
        name: 'player',
        
        mixins: [
            filterMixin
        ],

        props: {
            info: {
                type: Object,
                default: () => {}
            }
        },

        computed: {
            showingPlayer() {
                
            }
        }

    }
</script>