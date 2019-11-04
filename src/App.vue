<template>
  <div id="app">
    <div class="containter">
    <section class="section has-text-centered">
      <div class="container">
            <div>
                <h1 class="title has-text-centered">
                  otp-app
                </h1>
                <p class="subtitle has-text-centered">
                  browser otp generator
                </p>
            </div>
      </div>
    </section>
    </div>
    <one-time-password :otp="otp"></one-time-password>
    <hotp-display v-if="isHOTP && god_mode"></hotp-display>
    <totp-display v-if="isTOTP && god_mode"></totp-display>
    <inputs @implementation="changeDisplay" @generate="changeOTP"></inputs>
  </div>
</template>

<script>
import Inputs from './components/Inputs.vue'
import OneTimePassword from './components/OneTimePassword.vue'
import HotpDisplay from './components/HOTPDisplay.vue'
import TotpDisplay from './components/TOTPDisplay.vue'

export default {
  data() {
    return {
      otp: 'Not generated yet',
      implementation: 'HOTP',
      god_mode: true 
    }
  },
  methods: {
    changeDisplay(impl){
      this.implementation = impl;
    },
    changeOTP(otp){
      this.otp = otp;
    }
  },
  name: 'app',
  components: {
    Inputs, OneTimePassword, HotpDisplay, TotpDisplay
  },
  computed: {
    isHOTP: function(){
      return this.implementation == 'HOTP'; 
    },
    isTOTP: function(){
      return this.implementation == 'TOTP';
    }
  }
}
</script>
