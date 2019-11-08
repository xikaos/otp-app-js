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
                        <div class="select is-large">
                          <select v-on:change="changeUser(user)" v-model="user">
                            <option v-for="user in users">{{ user.email}}</option>
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
                        <button class="button is-primary is-large" @click="calculateOTP(passphrase, seed)">Compute</button>
                    </div>
                    <div class="column">
                        <button class="button is-primary is-large is-link" @click="submitForm(passphrase, seed)">Validate</button>
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
                timestamp: 0,
                generator: require('otpauth'),
                users: [
                    {email: 'pig@app.io'},
                    {email: 'wolf@app.io'}
                ],
                user: 'pig@app.io'
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
                    secret: passphrase,
                    timestamp: this.timestamp
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
            },
            changeUser(user){
                this.user = user
            },
            swal(options){
                this.$swal(options)
            },
            submitForm(){
                if(this.implementation == "HOTP"){
                    alert(HOTP)
                } 

                if(this.implementation == "TOTP"){
                    var options = {
                        method: 'POST', 
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            otp: this.otp,
                            email: this.user
                        })
                    }

                    fetch(
                        "/api/totp/validate",
                        options 
                    ).then((response) => {
                        return response.text()
                            .then((txt) => {
                               return txt == "true" 
                            })
                    }).then((valid) => {
                        if(valid){
                            this.swal({
                                title: 'Valid OTP 😁',
                                text: 'The OTP you sent is valid.',
                                type: 'success'
                            })
                        } else {
                            this.swal({ 
                                title:'Invalid OTP 💩',
                                text: 'The passphrase is wrong or you are out of sync',
                                type: 'error'
                            })
                        }
                    })
                }
            }
        }
    }
</script>
<style scoped>
    .button {
        width: 125px;
    }

    .swal2-header .swal2-content {
        font-family: Quicksand;
    }
</style>