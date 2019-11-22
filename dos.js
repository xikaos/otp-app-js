siege = require('siege')

siege()
  .on(3000)
  .for(1000000000000).times
  .get('/api/hotp/params')
  .attack()