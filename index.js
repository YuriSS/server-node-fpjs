
const {identity} = require('ramda')

const Server = require('./srcs/')

Server.bootServer(4545, '/client', 'ejs')
  .fork(console.error, identity)
