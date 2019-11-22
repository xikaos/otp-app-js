import Vue from 'vue'
import VueSweetalert2 from 'vue-sweetalert2';
import App from './App.vue'
import store from './lib/Store'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  data: {
    vstore: store
  }
}).$mount('#app')

Vue.use(VueSweetalert2);
