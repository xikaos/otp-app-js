var express = require('express')
var generator = require('otpauth')
var parser = require('body-parser')
var app = express();

let users = [
    {
        email: 'pig@app.io',
        password: 'tudonosso'
    },
    {
        email: 'wolf@app.io',
        password: 'nadadeles'
    }
];

var counter = 0;
var last_otp = "Undefined"

app.use(parser.json())


app.get('/api/totp/params', function(req, res){
    res.send(200, new Date().getTime());
})

app.get('/api/hotp/params', function(req, res){
    res.send(200, counter);
});

app.post('/api/totp/validate', function(req, res){
    let client_otp = req.body.otp
    let email = req.body.email
    let user = users.find((user, index) => {
        return user.email == email
    })

    let totp = new generator.TOTP({
        algorithm: 'SHA1',
        digits: 6,
        period: 30,
        secret: user.password,
        timestamp: new Date().getTime()
    });

    server_otp = totp.generate()

    let is_valid = (client_otp == server_otp)

    res.send(200, is_valid);
})

app.post('/api/hotp/validate', function(req,res){
    let client_otp = req.body.otp
    let email = req.body.email
    let user = users.find((user, index) => {
        return user.email == email
    })

    let hotp = new generator.HOTP({
        algorithm: 'SHA1',
        digits: 6,
        counter: counter,
        secret: user.password
    })

    server_otp = hotp.generate()

    let is_valid = (client_otp == server_otp)

    if(is_valid){
        counter += 1;
    }
    
    res.send(200, is_valid);
})

app.listen(3000, function () {
  console.log('OTP app listening on port 3000!');
});


