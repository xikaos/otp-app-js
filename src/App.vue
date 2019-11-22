<template>
  <div id="app">
    <div class="containter">
      <section class="section has-text-centered">
        <div class="container">
          <div>
            <h1 class="title has-text-centered">otp-app</h1>
            <p class="subtitle has-text-centered">
              browser otp generator
            </p>
          </div>
        </div>
      </section>
    </div>
    <one-time-password></one-time-password>
    <hotp-display v-if="isHOTP && god_mode" :client_counter="this.store.getClientCounter()"></hotp-display>
    <totp-display v-if="isTOTP && god_mode"></totp-display>
    <inputs @implementation="changeDisplay" @generate="changeOTP"  @increase-counter="changeCounter" :timestamp="clientTimestamp"></inputs>
  </div>
</template>

<script>
import Inputs from './components/Inputs.vue'
import OneTimePassword from './components/OneTimePassword.vue'
import HotpDisplay from './components/HOTPDisplay.vue'
import TotpDisplay from './components/TOTPDisplay.vue'
import Swal from 'sweetalert2'

export default {
  components: {
    Inputs, OneTimePassword, HotpDisplay, TotpDisplay
  },
  data() {
    return {
      otp: 'Not generated yet',
      implementation: 'HOTP',
      god_mode: true,
      counter: 0,
      store: this.$root.vstore.store
    }
  },
  methods: {
    changeCounter(counter){
        this.counter = counter;
    },
    changeDisplay(impl){
      this.implementation = impl;
    },
    changeOTP(otp){
      this.otp = otp;
    }
  },
  name: 'app',
  computed: {
    isHOTP: function(){
      return this.store.state.implementation == 'HOTP'; 
    },
    isTOTP: function(){
      return this.store.state.implementation == 'TOTP';
    },

    clientTimestamp: function(){
      return TotpDisplay.client_timestamp;
    }
  }
}
</script>
