
const Task = require('data.task')
const Either = require('data.either')
const {map, curry, compose, prop, identity} = require('ramda')

const Server = require('./srcs/')


const getFromProcess = p =>
  Either.fromNullable(process)
    .chain(compose(Either.fromNullable, prop('env')))
    .chain(compose(Either.fromNullable, prop(p)))

const port = getFromProcess('PORT')
  .bimap(_ => 3333, identity)
  .fold(identity, identity)

const path = getFromProcess('STATIC')
  .bimap(_ => '/client', identity)
  .fold(identity, identity)

const engine = getFromProcess('ENGINE')
  .bimap(_ => 'ejs', identity)
  .fold(identity, identity)


Server.bootServer(port, path, engine)
  .fork(console.error, identity)
