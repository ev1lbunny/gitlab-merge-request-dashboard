/*eslint no-console: ["error", { allow: ["log", "warn", "error"] }] */

const express = require('express')
const app = express()

app.set('view engine', 'pug')

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/template', (req, res) => {
  res.render('test-template')
})

module.exports = app