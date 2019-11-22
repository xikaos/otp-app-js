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
var last_totp = "Undefined."
var last_hotp = "Undefined."
var count_window = 5

app.use(parser.json())


app.get('/api/totp/params', function(req, res){
    res.send(200, {timestamp: new Date().getTime(), last_otp: last_totp});
})

app.get('/api/hotp/params', function(req, res){
    res.send(200, {counter : counter, last_otp: last_hotp});
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
        period: 5,
        secret: user.password,
        timestamp: new Date().getTime()
    });


    let diff = totp.validate({
        token: client_otp,
        window: 1
    })


    let is_valid = (diff == 0)

    if(is_valid){
        last_totp = totp.generate();
    }

    res.send(200, {valid: is_valid, last_valid: last_totp});
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

    let diff = hotp.validate({token: client_otp,secret: user.password,counter: counter,window: count_window})

    if(diff == undefined){
       return res.send(400, {valid: false});
    } else {
        if(diff >= 0 && diff <= count_window){
            counter += 1
            last_hotp = server_otp
            return res.send(200, {valid: true, last_otp: last_hotp});
        }
    }

    return res.send(400, {valid: false});
})

app.listen(3000, function () {
  console.log('OTP app listening on port 3000!');
});


