<template>
    <section class="section">
        <div class="container">
            <div class="box">
                <div class="columns has-text-black has-text-centered">
                    <div class="column">
                        <div class="select is-large">
                          <select v-model="implementation" v-on:change="changeImplementation()">
                            <option value="HOTP">HOTP</option>
                            <option value="TOTP">TOTP</option>
                          </select>
                        </div>
                    </div>
                    <div class="column">
                        <input type="text" class="input is-large" placeholder="passphrase" v-model="passphrase">
                    </div>
                    <div v-if="implementation == 'HOTP'" class="column">
                        <button class="button is-info is-large" @click="increaseCounter()">Event</button>
                    </div>
                    <div class="column">
                        <button class="button is-primary is-large" @click="calculateOTP(passphrase, seed)">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
    export default {
        name: 'Inputs',
        data() {
            return {
                seed: 127,
                passphrase: "passphrase",
                implementation: "HOTP",
                otp: "Not calculated",
                counter: 0,
                generator: require('otpauth')
            }
        },
        methods: {
            mounted(){
                this.changeImplementation()
            },
            HOTP(passphrase){
                let hotp = new this.generator.HOTP({
                    algorithm: 'SHA1',
                    digits: 6,
                    counter: this.counter,
                    secret: passphrase
                })
                return hotp.generate()
            },
            TOTP(passphrase){
                let totp = new this.generator.TOTP({
                    algorithm: 'SHA1',
                    digits: 6,
                    period: 30,
                    secret: passphrase
                });

                // Generate TOTP token.
                return totp.generate();
            },
            calculateOTP(passphrase, seed){
                if(this.implementation == "HOTP"){
                    this.otp = this.HOTP(passphrase, seed);
                } else {
                    this.otp = this.TOTP(passphrase);
                }
                this.updateOTP()
            },
            increaseCounter(){
                this.counter += 1;
            },
            updateOTP(){
                this.$emit('generate', this.otp)
            },
            changeImplementation(){
                this.$emit('implementation', this.implementation);
            }
        }
    }
</script>