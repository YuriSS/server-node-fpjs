
const Task = require('data.task')
const Either = require('data.either')
const {Help} = require('./srcs/support')
const {prop, compose, curry} = require('ramda')


const mountDirname = f => Help.exec(_ => f(__dirname, '.'))

module.exports = ({
  PROJECT_DIR : compose(mountDirname, prop('join'), require) ('path')
})
