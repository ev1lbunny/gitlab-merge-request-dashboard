var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.render('index', {merge_requests: require('../dummy/merge_requests'), row_colour: ""})
  })

router.get('/config', (req, res) => {
    res.json(global.gConfig)
  })
router.get('/health', (req, res) => {
    res.json('')
  })

module.exports = router