<template>
    <section class="section has-text-centered">
        <div class="container">
            <div class="box">
                <h3 class="title is-3">
                    Your OTP is:
                </h3>
                <h4 class="title is-4">
                    <span class="has-text-success" id="otp">{{ this.store.getClientOTP() }}</span>
                </h4>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                store: this.$root.vstore.store
            }
        },
        name: 'OneTimePassword',
        props: ['otp']
    }
</script>