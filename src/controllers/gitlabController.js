/*eslint no-undef: "off"*/
/*eslint no-unused-vars: "off"*/

const request_p = require('request-promise')

exports.stale_branch_check_by_project_id = function(req, res) {
    p_opts = {
        uri: global.gConfig.gitlab_base_uri + "/api/v4/projects/" + req.params.project_id + "/repository/branches?merged=true&per_page=1000",
        proxy: global.gConfig.proxy_address,
        method: 'GET',
        headers: {
            "PRIVATE-TOKEN": global.gConfig.gitlab_token
        },
        rejectUnauthorized: false,
        resolveWithFullResponse: true,
        json: true
    }

    const branches_promise = new Promise((resolve, reject) => {
        return resolve(request_p(p_opts))
    })

    const branch_state_promise = branches_promise.then(function(branches) {
        branch_states = []
        branches.body.forEach(branch => {
            branch_states.push(branch.merged)
        })
        return branch_states
    })

    const promises = [branches_promise, branch_state_promise]

    Promise.all(promises, res)
        .then(values => {
            stale_branches = false
            values[1].forEach(branch_state => {
                if (branch_state) {
                    stale_branches = true
                }
            })
            res
                .status(200)
                .send(stale_branches)
        })
        .catch(err => {
            handleError(err, res)
        })
}

exports.group_by_group_id = function(req, res) {
    opts = {
        uri: global.gConfig.gitlab_base_uri + "/api/v4/groups/" + req.params.group_id,
        proxy: global.gConfig.proxy_address,
        method: 'GET',
        headers: {
            "PRIVATE-TOKEN": global.gConfig.gitlab_token
        },
        rejectUnauthorized: false,
        resolveWithFullResponse: true,
        json: true
    }

    request_p(opts)
        .then(function(response) {
            res
                .status(response.statusCode)
                .send(response.body)
        })
        .catch(err => {
            handleError(err, res)
        })
}

exports.merge_requests_by_group_id = function(req, res) {
    opts = {
        uri: global.gConfig.gitlab_base_uri + "/api/v4/groups/" + req.params.group_id + "/merge_requests?state=opened&per_page=1000",
        proxy: global.gConfig.proxy_address,
        method: 'GET',
        headers: {
            "PRIVATE-TOKEN": global.gConfig.gitlab_token
        },
        rejectUnauthorized: false,
        resolveWithFullResponse: true,
        json: true
    }

    request_p(opts)
        .then(function(response) {
            res
                .status(response.statusCode)
                .send(response.body)
        })
        .catch(err => {
            handleError(err, res)
        })
}

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