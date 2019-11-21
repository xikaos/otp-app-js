var store = {
    debug: true,
    state: {
        implementation: "HOTP",
        client_totp: 'Not computed yet.',
        last_totp: 'Not polled yet.',
        client_hotp: 'Not computed yet.',
        last_hotp: 'Not polled yet.',
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
    getImplementation(){
        return this.state.implementation;
    },
    setImplementation(implementation){
        return this.state.implementation = implementation;
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
    getServerCounter(){
        return this.state.server_counter
    },
    setServerCounter(counter){
        return this.state.server_counter = counter;
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
    },
    getLastHOTP(){
        return this.state.last_hotp;
    },
    setLastHOTP(hotp){
        return this.state.last_hotop = hotp;
    },
    getLastTOTP(){
        return this.state.last_totp;
    },
    setLastTOTP(totp){
        return this.state.last_totp = totp;
    },
    getUsers(){
        return this.state.users;
    },
    setUsers(users){
        return this.state.users = users;
    }
}

export default { store }