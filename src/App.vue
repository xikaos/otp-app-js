<template>
  <div id="app">
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
    <one-time-password></one-time-password>
    <hotp-display></hotp-display>
    <inputs v-on:change-implementation="alert(implementation)"></inputs>
  </div>
</template>

<script>
import Inputs from './components/Inputs.vue'
import OneTimePassword from './components/OneTimePassword.vue'
import HotpDisplay from './components/HOTPDisplay.vue'

export default {
  name: 'app',
  components: {
    Inputs, OneTimePassword, HotpDisplay
  }
}
</script>
