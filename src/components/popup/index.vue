.<template>
    <transition name="fade">
        <div    
        v-if="isShown"
        class="popup flex flex-align-center flex-jusfy-center">
            <div 
            class="popup-body">
                <div class="popup-header">
                    <div class="popup-header__title">
                        {{ title }}
                    </div>
                    <div 
                    @click="closePopup"
                    class="popup-header__close">
                        <CloseIcon></CloseIcon>
                    </div>
                </div>
                <div class="popup-content">
                    <slot></slot>
                </div>
            </div>
        </div>
    </transition>
    
    
</template>

<script>
    import ClickOutside from 'vue-click-outside'

    import CloseIcon from '@/components/icons/close'
    
    export default {
        name: 'popup',

        props: {
            isShown: {
                type: Boolean,
                default: false
            },

            title: {
                type: String,
                default: ''
            }
        },

        data: () => {
            return {
                
            }
        },

        watch: {
            isShown(val) {
                if ( val ) {
                    document.addEventListener('keyup', this.handlerClose);
                }
                else {
                    document.removeEventListener('keyup', this.handlerClose); 
                }
            }
        },   

        directives: {
            ClickOutside
        },

        components: {
            CloseIcon
        },

        methods: {
            closePopup() {
                if ( this.isShown ) {
                    this.$emit('closePopup')
                } 
            },
            
            handlerClose(event) {
                if (event.key === 'Escape') {
                    if ( this.isShown ) {
                        this.closePopup();
                    } 
                }
            },
        },

        mounted() {
            this.popupItem = this.$el
        }
    }
</script>

<style lang="scss" scoped>
    .popup {
        z-index: 100;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.2);
        &-body {
            padding: 2rem;
            max-width: 100%;
            min-height: 10rem;
            background-color: #fff;
            border-radius: 1rem;
        }
        &-header {
            position: relative;
            margin-bottom: 1.5rem;
            &__title {
                margin-right: 4rem;
            }
            &__close {
                position: absolute;
                right: 0;
                top: 0;
            }
        }
        
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
        opacity: 0;
    }
</style>