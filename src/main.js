import Vue from 'vue'
import App from '@/components/App.vue'
import store from './store'

// import styles
import '@/assets/styles/main.scss';

Vue.config.productionTip = false

new Vue({
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
