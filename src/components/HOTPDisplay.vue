<template>
    <section>
        <div class="container">
            <div class="columns">
                <div class="column has-text-centered">
                    <div class="box">
                        <h4 class="title is-4 has-text-info" id="client-counter__title">Client Counter</h4>
                        <h5 class="title is-5 has-text-info" id="client-counter__value">0</h5>
                    </div>
                </div>
                <div class="column">
                    <div class="box has-text-centered">
                        <h4 class="title is-4 has-text-danger" id="server-counter__value">Server Counter</h4>
                        <h5 class="title is-5 has-text-danger" id="server-counter__value">0</h5>
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
        name: 'HotpDisplay'       
    }
</script>
<style scoped>
    .button {
        min-width: 130px;
    }
</style>    