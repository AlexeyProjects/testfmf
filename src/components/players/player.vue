<template>
    <div 
    class="player flex flex-jusfy-between">
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
    },

    computed: {
        showingPlayer() {
            
        }
    },

    filters: {
        numberViewing(val) {
            // if (val >= 1000000) {
            //     return (val / 1000000) + " миллионов"
            // }
            // else if (number >= 1000) {
            //     return (val / 1000) + "K"
            // }
            // else {
            //     return val
            // }
            // let titles = ["миллион", 'миллиона', 'миллионов']
            // function getNoun(number, one, two, five) {
            //     console.log(...titles)
            //     let n = Math.abs(number);
            //     n %= 100;
            //     if (n >= 5 && n <= 20) {
            //         return five;
            //     }
            //     n %= 10;
            //     if (n === 1) {
            //         return `${val}${one}`;
            //     }
            //     if (n >= 2 && n <= 4) {
            //         return `${val}${two}`;
            //     }
            //         return `${val}${five}`;
            // }
            // return getNoun(val, ...titles)
        }
    }
}
</script>