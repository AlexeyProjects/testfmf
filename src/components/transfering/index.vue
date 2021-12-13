<template>
    <div class="transfering">
        <div 
        v-if="!balanceMoreZero"
        class="">
            Вы не можете отправить монеты игрокам, т.к. у вас отрицательный баланс
        </div>

        <div 
        v-else
        class="">
            <label 
            class="flex flex-align-center hovering flex-jusfy-between mb-10"
            v-show="item != currentStepPlayer && !item.losed"
            v-for="(item,key) in players"
            :key="key"
            >   
                
                <div class="">
                    {{ item.title }}
                </div>
                <input 
                name="transfering"
                
                @input="choosingPlayer(item)"
                type="radio">
            </label>

            <div class="mb-10 mt-20 col flex-align-center">

                <div class="mb-10">
                    Введите сумму не больше вашего баланса и кратную 1000
                </div>
                <input 
                oninput="this.value = this.value.replace(/[^0-9]/g, '')"
                type="text" 
                v-model="transferingSumm"
                maxlength="8"
                class="input width--full mb-10" 
                placeholder="Введите сумму">
                
                <div 
                :class="{ 
                    'btn--disable': !canTransfering
                }"
                @click="transferCoin"
                class="btn btn--white">
                    Передать монеты
                </div>

            </div>
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
        },

        data: ()=> {
            return {
                choosedPlayer: '',
                transferingSumm: '',
                summNoMoreBalance: true,
                summFilled: false,
                canDevide: false
            }
        },

        watch: {
            transferingSumm(val) {
                if (!val) {
                    this.summFilled = false
                }
                else {
                    this.summFilled = true
                }

                if ( +val >= this.currentStepPlayer.balance ) {
                    this.summNoMoreBalance = false
                }
                else {
                    this.summNoMoreBalance = true
                }

                if ( +val % 1000 == 0 ) {
                    this.canDevide = true
                }

                else {
                    this.canDevide = false
                }
            }

        },

        computed: {
            balanceMoreZero() {
                if ( this.currentStepPlayer.balance <= 1000 ) {
                    console.log('Меньше')
                    return false
                }
                else {
                    console.log('Больше')
                    return true
                }
                
            },

            canTransfering() {
                if ( this.summFilled && this.choosedPlayer && this.summNoMoreBalance && this.canDevide ) {
                    return true
                }
            }
        },

        methods: {
            transferCoin() {
                this.$emit('transferedCoin', this.choosedPlayer, this.transferingSumm)
                this.$emit('closePopup')
            },
            
            choosingPlayer(item) {
                this.choosedPlayer = item
            }
        },
        
    }
</script>

<style lang="scss" scoped>

</style>