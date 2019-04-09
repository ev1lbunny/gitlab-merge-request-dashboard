var express = require('express')
var request     = require('request');
var index_router = express.Router()

index_router.get('/', (req, res) => {
  res.render('index', {groups: require('../config/group')})
})

index_router.get('/group/:group_identifier', (req, res) => {
  request.get("http://localhost:3000/gitlab/merge_requests_by_group/"+req.params.group_identifier, 
    function(error, response, body){
      merges_to_review = JSON.parse(body)
      merges_to_review = merges_to_review.flat(1)
      res.render('group', {groups: require('../config/group'), selected_group: req.params.group_identifier, merge_requests: merges_to_review})
    })
})
  
index_router.get('/config', (req, res) => {
  //res.json(global.gConfig)
  res
    .status(200)
    .send("NO TOKEN FOR YOU BILLY")
})

index_router.get('/health', (req, res) => {
  res.json('')
})

/** Tidy up favicon calls returning 404 till icon file is provided**/
index_router.get('/favicon.ico', (req, res) => {
  res.status(204)
})

module.exports = index_router