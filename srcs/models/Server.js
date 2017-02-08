
const Task = require('data.task')
const Either = require('data.either')
const {curry, compose, prop} = require('ramda')

const {Help} = require('../support/')

const use = curry((tag, val, app) => Help.exec(_ => app.use(tag, val)))

const expressStatic = dir =>
  compose(f => f(dir), prop('static'), require) ('express')

const useStatic = curry((dir, app) =>
  Help.exec(_ => app.use(expressStatic(dir)))
)
  
const set = curry((tag, val, app) => Help.exec(_ => app.set(tag, val)))

const listen = curry((port, app) =>
  new Task((rej, res) => {
    try {
      return app.listen(port, _ => res(`Server is running on port ${port}`))
    }
    catch (e) {
        return rej(e)
    }
  })
)

const createApp = _ => (compose(Help.exec, require) ('express'))

const configApp = curry((dir, engine, app) =>
  Task.of(app)
    .chain(set('views', dir))
    .chain(set('view engine', require(engine)))
    .chain(useStatic(dir))
)

const boot = curry((port, dir, engine) =>
  createApp()
    .chain(configApp(dir, engine))
    .chain(listen(port))
)


module.exports = boot
