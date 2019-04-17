/* Application Requirements */
const express = require('express')
const app = express()
const addRequestId = require('express-request-id')()
const morgan = require('morgan')
const index = require('./routes/index')
const gitlab = require('./routes/gitlab')
const path = require('path')

/* Config Loading Requirements */
const _ = require('lodash')
const config = require('./config/app.json')
const defaultConfig = config.dev
const environment = process.env.NODE_ENV || 'DEV'
const environmentConfig = config[environment]
const finalConfig = _.merge(defaultConfig, environmentConfig)
global.gConfig = finalConfig;

/* Setup Morgen use tokens */
morgan.token('id', function getId(req) {
  return req.id
});

/* Logger Setup */
var loggerFormat = ':id [:date[web]]" ~ :method :url" :status ~ :response-time ms ~ :remote-addr';

/* App Setup */
app.use(addRequestId);
app.set('view engine', 'pug')
app.use(morgan(loggerFormat, {
  skip: function (req, res) {
      return res.statusCode < 400
  },
  stream: process.stderr
}))
app.use(morgan(loggerFormat, {
  skip: function (req, res) {
      return res.statusCode >= 400
  },
  stream: process.stdout
}))

/* Configured Routes */
app.use('/', index);
app.use('/gitlab/', gitlab)
app.use("/public", express.static(path.join(__dirname, 'public')))

module.exports = app
