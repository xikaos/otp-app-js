<template>
    <section class="section">
        <div class="container">
            <div class="box">
                <div class="columns has-text-black has-text-centered">
                    <div class="column">
                        <div class="select is-large">
                          <select v-model="implementation" @change="changeImplementation">
                            <option value="HOTP">HOTP</option>
                            <option value="TOTP">TOTP</option>
                          </select>
                        </div>
                    </div>
                    <div class="column">
                        <div class="select is-large">
                          <select v-model="user" @change="changeUser()">
                            <option v-for="user in this.store.state.users">{{ user.email }}</option>
                          </select>
                        </div>    
                    </div>
                    <div class="column">
                        <input type="text" class="input is-large" placeholder="passphrase" v-model="passphrase" @change="changePassphrase">
                    </div>
                    <div v-if="this.implementation == 'HOTP'" class="column">
                        <button class="button is-info is-large" @click="increaseCounter()">Event</button>
                    </div>
                    <div class="column">
                        <button class="button is-primary is-large" @click="calculateOTP()">Compute</button>
                    </div>
                    <div class="column">
                        <button class="button is-primary is-large is-link" @click="submitForm()">Validate</button>
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
                user: 'Nobody',
                implementation: 'HOTP',
                otp: "Not calculated",
                passphrase: 'passphrase',
                counter: 0,
                timestamp: 0,
                generator: require('otpauth'),
                users: [
                    {email: 'pig@app.io'},
                    {email: 'wolf@app.io'}
                ],
                store: this.$root.vstore.store
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
                    counter: this.store.state.client_counter,
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
            calculateOTP(passphrase){
                if(this.store.state.implementation == "HOTP"){
                    this.store.setClientOTP(this.HOTP(this.store.state.passphrase, this.store.state.client_counter))
                } else {
                    this.store.setClientOTP(this.TOTP(this.store.state.passphrase))
                }
            },
            increaseCounter(){
                var counter = this.store.getClientCounter();
                this.store.setClientCounter(parseInt(counter) + 1)
            },
            changeImplementation(){
                this.store.state.implementation = this.implementation
            },
            changeUser(){
                this.store.state.user = this.user
            },
            changePassphrase(){
                this.store.state.passphrase = this.passphrase
            },
            swal(options){
                this.$swal(options)
            },
            submitForm(){
                if(this.store.state.implementation == "HOTP"){
                    var options = {
                        method: 'POST', 
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            otp: this.store.getClientOTP(),
                            email: this.user
                        })
                    }
                    fetch(
                        "/api/hotp/validate",
                        options 
                    ).then((response) => {
                        return response.json()
                            .then((json) => {
                               return json 
                            })
                    }).then((response) => {
                        if(response.valid){
                            this.swal({
                                title: 'Valid OTP 😁',
                                text: 'The OTP you sent is valid.',
                                type: 'success'
                            })

                            this.store.state.server_hotp = response.last_otp
                        } else {
                            this.swal({ 
                                title:'Invalid OTP 😵',
                                text: 'The passphrase is wrong or you are out of sync',
                                type: 'error'
                            })
                        }
                    })
                    .catch((error) => {
                        debugger;
                    })

                } 

                if(this.store.state.implementation == "TOTP"){
                    var options = {
                        method: 'POST', 
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            otp: this.store.state.client_otp,
                            email: this.user
                        })
                    }

                    fetch(
                        "/api/totp/validate",
                        options 
                    ).then((response) => {
                        return response.json()
                            .then((json) => {
                               return json
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