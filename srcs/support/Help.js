
const Task = require('data.task')
const Either = require('data.either')
const {identity, curry, compose, map, prop, ifElse} = require('ramda')


const exec = (f,ctx) => new Task((rej, res) => {
  try {
    const args = Array.prototype.slice.call(arguments, 2)
    return res(f.apply(ctx, args))
  }
  catch (e) {
    return rej('Errrrrroooooouuuuu :: '.concat(e))
  }
})

const trace = curry(function(tag, a) {
  console.log(`${tag}: `, a)
  return a
})

const eitherToTask = either => either.fold(Task.rejected, Task.of)

const taskToEither = task => task.fork(Either.Left, Either.Right)
  
const settingsProp = p => exec(_ => require('../../settings'))
  .chain(prop(p))
  .map(trace('zzz'))

const projectDir = settingsProp('PROJECT_DIR')

const pathProp = p => exec(_ => require('path'))
  .chain(compose(eitherToTask, Either.fromNullable, prop(p)))

const requireLib = curry((local, lib) => Either.fromNullable(local)
  .chain(
    ifElse(
      identity,
      _ => taskToEither(projectDir),
      _ => Either.of('.')
    )
  )
  .chain(prefix => pathProp('join').chain(f => Help.exec(_ => f(prefix, lib))))
  .map(trace('## REQUILRE LIB'))
)

const chain = curry((f, functor) => functor.chain(f))

const mountDir = dir =>
  pathProp('join')
  .chain(f => projectDir.chain(prefix => exec(_ => f(prefix, dir))))


module.exports = {eitherToTask, mountDir, exec, chain, trace, requireLib, settingsProp, projectDir, pathProp}
