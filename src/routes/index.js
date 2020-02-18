/*eslint no-undef: "off"*/
/*eslint no-unused-vars: "off"*/
/*eslint console: "off"*/

var express = require('express');
var request = require('request');
var index_router = express.Router();

index_router.get('/', (req, res) => {
    res.render('home', {
        groups: require('../config/group')
    })
})

index_router.get('/group/:group_identifier', (req, res) => {
    request.get("http://localhost:" + global.gConfig.port + "/gitlab/merge_requests_by_group/" + req.params.group_identifier,
        function(error, response, body) {
            if (error) {
                handleError(error, res)
            } else {
                merges_to_review = JSON.parse(body)
                merges_to_review = merges_to_review.flat(1)
                merges_to_review = merges_to_review.sort(predicateBy("updated_at"))
                res.render('group', {
                    groups: require('../config/group'),
                    rag_states: require('../config/rag'),
                    selected_group: req.params.group_identifier,
                    merge_requests: merges_to_review
                })
            }
        })
})

index_router.get('/config', (req, res) => {
    //res.json(global.gConfig)
    res
        .status(501)
        .send("Not implemented yet")
})

index_router.get('/health', (req, res) => {
    res
        .status(501)
        .send("Not implemented yet")
})

/** Tidy up favicon calls returning 404 till icon file is provided**/
index_router.get('/favicon.ico', (req, res) => {
    res.status(204)
})

function handleError(err, res) {
    if (err.response) {
        res
            .status(err.response.statusCode)
            .send(err.response.body)
    } else {
        res
            .status(500)
            .send("FATAL UNHANDLED ERROR. UNABLE TO RECOVER: " + err)
    }
}

function predicateBy(prop) {
    return function(a, b) {
        if (a[prop] > b[prop]) {
            return -1;
        } else if (a[prop] < b[prop]) {
            return 1;
        }
        return 0;
    }
}

module.exports = index_router