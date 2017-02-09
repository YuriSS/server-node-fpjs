
const Task = require('data.task')
const Either = require('data.either')
const {map, curry, compose, prop} = require('ramda')

const {Help} = require('../../support/')
const Tools = require('./tools')


const configApp = curry((dir, engine, app) =>
  Task.of(app)
    .chain(Tools.set('views', dir))
    .chain(Tools.set('view engine', require(engine)))
    .chain(Tools.useStatic(dir))
)

const boot = curry((port, dir, engine) =>
  Task.of(app => dir => engine => ({app, dir, engine}))
    .ap(compose(Help.exec, require) ('express'))
    .ap(compose(Help.eitherToTask, Help.mountDir) (dir))
    .ap(compose(Help.eitherToTask, Either.fromNullable) (engine))
    .chain(({app:a, dir:d, engine:e}) => configApp(d, e, a))
    .chain(Tools.listen(port))
)


module.exports = boot
