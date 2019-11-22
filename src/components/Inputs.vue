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
                            <option v-for="user in this.store.getUsers()">{{ user.email }}</option>
                          </select>
                        </div>    
                    </div>
                    <div class="column">
                        <input type="text" class="input is-large" placeholder="passphrase" v-model="passphrase" @change="changePassphrase">
                    </div>
                    <div v-if="this.store.getImplementation() == 'HOTP'" class="column">
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
                generator: require('otpauth'),
                implementation: 'HOTP',
                passphrase: '',
                user: 'user',
                store: this.$root.vstore.store
            }
        },
        methods: {
            isHOTP(){ return this.store.getImplementation() == "HOTP" },
            HOTP(){
                let hotp = new this.generator.HOTP({
                    algorithm: 'SHA1',
                    digits: 6,
                    counter: this.store.getClientCounter(),
                    secret: this.store.getPassphrase()
                })
                return hotp.generate()
            },
            TOTP(){
                let totp = new this.generator.TOTP({
                    algorithm: 'SHA1',
                    digits: 6,
                    period: 30,
                    secret: this.store.getPassphrase(),
                    timestamp: this.store.getClientTimestamp()
                });

                // Generate TOTP token. 
                return totp.generate();
            },
            calculateOTP(){
                if(this.isHOTP()){
                    this.store.setClientHOTP(this.HOTP())
                } else {
                    this.store.setClientTOTP(this.TOTP())
                }
            },
            increaseCounter(){
                var counter = this.store.getClientCounter();
                this.store.setClientCounter(parseInt(counter) + 1)
            },
            changeImplementation(){
                this.store.setImplementation(this.implementation)
            },
            changeUser(){
                this.store.setUser(this.user)
            },
            changePassphrase(){
                this.store.setPassphrase(this.passphrase)
            },
            swal(options){
                this.$swal(options)
            },
            submitForm(){
                let otp = this.isHOTP() ? this.store.getClientHOTP() : this.store.getClientTOTP()
                let endpoint = this.isHOTP() ? "/api/hotp/validate" : "/api/totp/validate"
                let request_body = {
                    otp: otp,
                    email: this.store.getUser()
                }


                let options = {
                    method: 'POST', 
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(request_body)
                }

                return fetch(
                    endpoint,
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

                        if(this.isHOTP()){
                            this.store.setLastHOTP(response.last_otp)
                        } else {
                            this.store.setLastTOTP(response.last_otp)
                        }
                    } else {
                        this.swal({ 
                            title:'Invalid OTP 😵',
                            text: 'The passphrase is wrong or you are out of sync',
                            type: 'error'
                        })
                    }
                })
                .catch((error) => {
                    this.swal({ 
                        title:'Something is wrong 😵',
                        text: 'The request returned an error to failed reach the server.',
                        type: 'error'
                    })
                })
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