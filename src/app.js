/*eslint no-console: ["error", { allow: ["log", "warn", "error"] }] */

const express = require('express')
const app = express()
const _ = require('lodash')
const config = require('./config/app.json')
const defaultConfig = config.dev
const environment = process.env.NODE_ENV || 'DEV'
const environmentConfig = config[environment]
const finalConfig = _.merge(defaultConfig, environmentConfig)

global.gConfig = finalConfig;

app.set('view engine', 'pug')

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/config', (req, res) => {
  res.json(global.gConfig)
})

module.exports = app
