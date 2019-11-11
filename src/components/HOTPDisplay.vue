<template>
    <section>
        <div class="container">
            <div class="columns">
                <div class="column has-text-centered">
                    <div class="box">
                        <h4 class="title is-4 has-text-info" id="client-counter__title">Client Counter</h4>
                        <h5 class="title is-5 has-text-info" id="client-counter__value">{{ this.store.state.client_counter }}</h5>
                    </div>
                </div>
                <div class="column"> 
                    <div class="box has-text-centered">
                        <h4 class="title is-4 has-text-danger" id="server-counter__value">Server Counter</h4>
                        <h5 class="title is-5 has-text-danger" id="server-counter__value">{{ this.store.state.server_counter }}</h5>
                    </div>
                </div>
                <div class="column">
                    <div class="box has-text-centered">
                        <h4 class="title is-4 has-text-danger" id="last-valid-otp__title">Last Valid OTP</h4>
                        <h5 class="title is-5 has-text-danger" id="last-valid-otp__title">{{ this.store.state.server_hotp }}</h5>
                    </div>
                </div>  
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: 'HotpDisplay',
        data() {
            return {
                store: this.$root.vstore.store,
                last_otp: "Undefined."   
            }
        },
        props: ['client_counter'],
        methods: {
            pollServer(){
                fetch('http://localhost/api/hotp/params')
                    .then((res) => {
                        return res.json().then((json) => {
                            this.store.state.server_counter = json.counter;
                            this.store.state.last_hotp = json.last_otp  ;
                        });
                    })
            },
            syncClient(){
                fetch('http://localhost/api/hotp/params')
                    .then((res) => {
                        return res.json().then((json) => {
                            this.store.state.client_counter = json.counter;
                            this.store.state.last_hotp = json.last_otp;
                        });
                    })
            }
        },
        mounted: function(){
            this.syncClient()
            setInterval(this.pollServer, 500)
        }       
    }
</script>
<style scoped>
    .button {
        width: 125px;
    }
</style>    