var store = {
    debug: true,
    state: {
        implementation: "HOTP",
        client_otp: 'Not computed yet.',
        server_totp: 'Not polled yet.',
        server_hotp: 'Not polled yet.',
        client_counter: 0,
        server_counter: 0,
        client_timestamp: 0,
        server_timestamp: 0,
        users: [
            {email: 'pig@app.io'},
            {email: 'wolf@app.io'}
        ],
        passphrase: 'passphrase',
        user: 'None'
    },
    setClientOTP(otp){
        if(this.debug) console.log('SetClientOTP: Value {', this.state.client_otp, '}.') 
        return this.state.client_otp = otp
    },
    getClientOTP(){
        if(this.debug) console.log('getClientOTP: Value: {', this.state.client_otp, '}.')
            return this.state.client_otp
    },
    setClientCounter(counter){
        if(this.debug) console.log('setClientCounter: Value: {', this.state.client_counter, '}.')    
        return this.state.client_counter = counter
    },
    getClientCounter(){
        if(this.debug) console.log('getClientCounter: Value: {', this.state.client_counter, '}.')    
        return this.state.client_counter;
    },
    setClientTimestamp(timestamp){
        return this.state.client_timestamp = timestamp
    },
    getClientTimestamp(){
        return this.state.client_timestamp
    },
    setServerTimestamp(timestamp){
        return this.state.server_timestamp = timestamp
    },
    getServerTimestamp(){
        return this.state.server_timestamp
    }

}

export default { store }