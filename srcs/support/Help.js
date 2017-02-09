
const Task = require('data.task')
const Either = require('data.either')
const {curry, compose, map, prop} = require('ramda')


const eitherToTask = either => either.fold(Task.rejected, Task.of)

const taskToEither = task => task.fork(Either.Left, Either.Right)

const mountDir = dir =>
  Either.of(d => f => compose(map(root => f(root, d)), taskToEither, prop('PROJECT_DIR'), require) ('../../settings'))
    .ap(Either.fromNullable(dir))
    .ap(compose(map(prop('join')), Either.fromNullable, require) ('path'))

const exec = f => new Task((rej, res) => {
  try {
    return res(f())
  }
  catch (e) {
    return rej('Errrrrroooooouuuuu :: '.concat(e))
  }
})

const chain = curry((f, functor) => functor.chain(f))

const trace = curry(function(tag, a) {
  console.log(`${tag}: `, a)
  return a
})


module.exports = {eitherToTask, mountDir, exec, chain, trace}
