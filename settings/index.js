
const Task = require('data.task')
const Either = require('data.either')
const {Help} = require('../srcs/support/')
const {prop, compose, curry, map} = require('ramda')


const mountDirname = f => Help.exec(_ => f(__dirname, '.'))

module.exports = ({
  PROJECT_DIR : compose(Help.chain(mountDirname), Help.pathProp) ('join'),
  ROUTES : Task.of(Help.requireLib(true, '/Routes'))
})
