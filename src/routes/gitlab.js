/*eslint no-console: ["error", { allow: ["error"] }] */

var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/projects', (req, res) => {
  request({
    uri: global.gConfig.gitlab_base_uri+"/api/v4/projects" ,
    headers: {"PRIVATE-TOKEN": global.gConfig.gitlab_token},
    rejectUnauthorized: false
  })
  .on('error', err => { 
      console.error("ERROR OCCURED: DO SOMETHING") //TODO
      return err
    })
  .pipe(res)
})

module.exports = router