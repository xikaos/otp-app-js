<template>
    <section class="section has-text-centered">
        <div class="container">
            <div class="box">
                <h3 class="title is-3">
                    Your OTP is:
                </h3>
                <h4 class="title is-4">
                    <span class="has-text-success" id="otp">{{ OTP }}</span>
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
        computed: {
            OTP(){
                if(this.store.getImplementation() == "HOTP"){
                    return this.store.getClientHOTP();
                } else {
                    return this.store.getClientTOTP();
                }
            }
        },
        name: 'OneTimePassword',
        props: ['otp']
    }
</script>