import Vue from 'vue'
import VueSweetalert2 from 'vue-sweetalert2';
import App from './App.vue'

Vue.config.productionTip = false


new Vue({
  render: h => h(App),
  implementation: 'TOTP'
}).$mount('#app')

Vue.use(VueSweetalert2);
