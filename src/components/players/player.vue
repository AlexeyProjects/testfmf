<template>
    <div class="player flex flex-jusfy-between">
        <div class="">
            {{ info.title }}
        </div>
        <div class="">
            {{ info.balance }}
        </div>
    </div>
</template>

<script>
export default {
    name: 'player',
    
    props: {
        info: {
            type: Object,
            default: () => {}
        }
    }
}
</script>