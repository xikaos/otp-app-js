

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
    getPassphrase(){
        return this.state.passphrase;
    },
    setPassphrase(passphrase){
        return this.state.passphrase = passphrase;
    },
    getImplementation(){
        return this.state.implementation;
    },
    setImplementation(implementation){
        return this.state.implementation = implementation;
    },
    setClientTOTP(otp){
        return this.state.client_totp = otp
    },
    getClientTOTP(){
        return this.state.client_totp
    },
    getClientHOTP(){
        return this.state.client_hotp
    },
    setClientHOTP(otp){
        return this.state.client_hotp = otp 
    },
    setClientCounter(counter){
        return this.state.client_counter = counter
    },
    getClientCounter(){
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
        return this.state.last_hotp = hotp;
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
    },
    getUser(){
        return this.state.user;
    },
    setUser(user){
        return this.state.user = user;
    }
}

export default { store }