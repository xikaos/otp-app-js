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
    <section class="section">
        <div class="container">
            <div class="columns has-text-centered has-text-info">
                <param-column id="param-1"></param-column>
                <param-column id="param-2"></param-column>
            </div>
        </div>
    </section>
    <inputs v-on:change-implementation="alert(implementation)"></inputs>
  </div>
</template>

<script>
import Inputs from './components/Inputs.vue'
import OneTimePassword from './components/OneTimePassword.vue'
import ParamColumn from './components/ParamColumn.vue'

export default {
  name: 'app',
  components: {
    Inputs, OneTimePassword, ParamColumn
  }
}
</script>
