<template>
    <section>
        <div class="container">
            <div class="columns">
                <div class="column has-text-centered">
                    <div class="box">
                        <h4 class="title is-4 has-text-info" id="client-timestamp__title">Client Timestamp</h4>
                        <h5 class="title is-5 has-text-info" id="client-timestamp__value" title="timeDiff">{{ this.store.getClientTimestamp() }}</h5>
                        <h4 class="subtitle is-4 has-text-info">Timestep</h4>
                        <h5 class="subtitle is-5 has-text-info">{{ clientTimestep }}</h5>   
                    </div>
                </div>
                    <div class="column has-text-centered">
                        <div class="box">
                            <h4 class="title is-4 has-text-success" id="client-timestamp__title">Time Diff</h4>
                            <h5 class="title is-5 has-text-success" id="client-timestamp__value">{{ timeDiff }}</h5>
                            <h4 class="subtitle is-4 has-text-success">Timestep</h4>
                            <h5 class="subtitle is-5 has-text-success">{{ diffTimestep }}</h5>   
                        </div>
                    </div>
                    <div class="column">
                        <div class="box has-text-centered">
                            <h4 class="title is-4 has-text-danger" id="server-timestamp__value">Server Timestamp</h4>
                            <h5 class="title is-5 has-text-danger" id="server-timestamp__value">{{ this.store.getServerTimestamp() }}</h5>
                            <h4 class="subtitle is-4 has-text-danger" id="subtitle server-timestamp__title">Timestep</h4>
                            <h5 class="subtitle is-5 has-text-danger">{{ serverTimestep }}</h5>   
                        </div>
                    </div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: 'TotpDisplay',
        data() {
            return {
                store: this.$root.vstore.store
            }
        },
        methods: {
            pollServer(){
                fetch('http://localhost/api/totp/params')
                    .then((res) => {
                        res.json().then((json) => {
                            this.store.setServerTimestamp(json.timestamp);
                        });
                    })
            },
            getCurrentTimestamp(){
                this.store.setClientTimestamp(new Date().getTime());
            }

        },
        mounted: function(){
            setInterval(this.pollServer, 500)
            setInterval(this.getCurrentTimestamp, 500)
        },
        computed: {
            timeDiff(){
                return Math.round(this.store.getClientTimestamp()) - Math.round(this.store.getServerTimestamp());
            },

            clientTimestep(){
                return Math.round(this.store.getClientTimestamp() / 30);
            },

            serverTimestep(){
                return Math.round(this.store.getServerTimestamp() / 30);
            },

            diffTimestep(){
                return (Math.round(this.store.getClientTimestamp() / 30) - Math.round(this.store.getServerTimestamp() / 30))
            }
        }       
    }
</script>
<style scoped>
    .button {
        min-width: 130px;
    }
</style>    