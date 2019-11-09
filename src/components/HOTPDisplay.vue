<template>
    <section>
        <div class="container">
            <div class="columns">
                <div class="column has-text-centered">
                    <div class="box">
                        <h4 class="title is-4 has-text-info" id="client-counter__title">Client Counter</h4>
                        <h5 class="title is-5 has-text-info" id="client-counter__value">{{ client_counter }}</h5>
                    </div>
                </div>
                <div class="column"> 
                    <div class="box has-text-centered">
                        <h4 class="title is-4 has-text-danger" id="server-counter__value">Server Counter</h4>
                        <h5 class="title is-5 has-text-danger" id="server-counter__value">{{ server_counter }}</h5>
                    </div>
                </div>
                <div class="column">
                    <div class="box has-text-centered">
                        <h4 class="title is-4 has-text-danger" id="last-valid-otp__title">Last Valid OTP</h4>
                        <h5 class="title is-5 has-text-danger" id="last-valid-otp__title">0</h5>
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
                'server_counter': 0,
                'last_otp': "Undefined."   
            }
        },
        props: ['client_counter'],
        methods: {
            pollServer(){
                fetch('http://localhost/api/hotp/params')
                    .then((res) => {
                        return res.text().then((txt) => {
                            this.server_counter = txt;
                        });
                    })
            }
        },
        mounted: function(){
            setInterval(this.pollServer, 500)
        }       
    }
</script>
<style scoped>
    .button {
        width: 125px;
    }
</style>    