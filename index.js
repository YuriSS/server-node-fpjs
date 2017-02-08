
const Server = require('./srcs/')

Server.bootServer(3000, '/client', 'ejs')
  .fork(console.error, console.log)
