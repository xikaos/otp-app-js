var express = require('express')
var app = express();

var counter = 0;

app.get('/api/totp/params', function(req, res){
    res.send(200, new Date().getTime());
})

app.get('/api/hotp/params', function(req, res){
    res.send(200, counter);
});

app.listen(3000, function () {
  console.log('OTP app listening on port 3000!');
});

