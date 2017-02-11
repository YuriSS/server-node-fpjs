
const Task = require('data.task')
const Either = require('data.either')
const {map, curry, compose, prop} = require('ramda')

const {Help} = require('../../support/')
const Tools = require('./tools')


const Routes = Help.settingsProp('ROUTES')

const boot = app => Help.settingsProp('ROUTES')


module.exports = boot
