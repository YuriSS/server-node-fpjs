
const Task = require('data.task')
const Either = require('data.either')
const {curry, compose, prop} = require('ramda')

const {Help} = require('../../support/')
const Tools = require('./tools')


const createApp = _ => compose(Help.exec, require) ('express')

const configApp = curry((dir, engine, app) =>
  Task.of(app)
    .chain(Tools.set('views', dir))
    .chain(Tools.set('view engine', require(engine)))
    .chain(Tools.useStatic(dir))
)

const boot = curry((port, dir, engine) =>
  createApp()
    .chain(app => dir => configApp(dir, engine, app))
    .ap(compose(Help.eitherToTask, Help.mountDir) (dir))
    .chain(Tools.listen(port))
)


module.exports = boot
