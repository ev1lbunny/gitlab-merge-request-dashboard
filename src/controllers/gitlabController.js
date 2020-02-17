/*eslint no-undef: "off"*/
/*eslint no-unused-vars: "off"*/

const request_p = require('request-promise')

exports.projects_by_group_identifier = function(req, res) {

  opts = {
    uri: global.gConfig.gitlab_base_uri+"/api/v4/groups/"+req.params.group_identifier+"/projects?per_page=1000",
    method: 'GET',
    headers: {"PRIVATE-TOKEN": global.gConfig.gitlab_token},
    rejectUnauthorized: false,
    resolveWithFullResponse: true,
    json: true
  }

  request_p(opts)
  .then(function (response) {
    res
    .status(response.statusCode)
    .send(response.body)
  })
  .catch(err => {
    handleError(err, res)
  })
}

exports.merge_requests_by_project_id = function (req, res) {
  opts = {
    uri: global.gConfig.gitlab_base_uri+"/api/v4/projects/"+req.params.project_id+"/merge_requests?state=opened&per_page=1000",
    method: 'GET',
    headers: {"PRIVATE-TOKEN": global.gConfig.gitlab_token},
    rejectUnauthorized: false,
    resolveWithFullResponse: true,
    json: true
  }

  request_p(opts)
    .then(function (response) {
      res
      .status(response.statusCode)
      .send(response.body)
    })
    .catch(err => {
      handleError(err, res)
    })
}

exports.stale_branch_check_by_project_id = function (req, res) {
  p_opts = {
    uri: global.gConfig.gitlab_base_uri+"/api/v4/projects/"+req.params.project_id+"/repository/branches?merged=true&per_page=1000",
    method: 'GET',
    headers: {"PRIVATE-TOKEN": global.gConfig.gitlab_token},
    rejectUnauthorized: false,
    resolveWithFullResponse: true,
    json: true
  }

  const branches_promise = new Promise((resolve, reject) => {
    return resolve(request_p(p_opts))
  })

  const branch_state_promise = branches_promise.then(function(branches) {
    branch_states = []
    branches.body.forEach(branch =>{
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

exports.group_by_identifier = function(req, res) {
  opts = {
    uri: global.gConfig.gitlab_base_uri+"/api/v4/groups/"+req.params.group_identifier,
    method: 'GET',
    headers: {"PRIVATE-TOKEN": global.gConfig.gitlab_token},
    rejectUnauthorized: false,
    resolveWithFullResponse: true,
    json: true
  }

  request_p(opts)
    .then(function (response) {
      res
      .status(response.statusCode)
      .send(response.body)
    })
    .catch(err => {
      handleError(err, res)
    })
} 

exports.merge_requests_by_group = function(req, res) {
    p_opts = {
      uri: global.gConfig.gitlab_base_uri+"/api/v4/groups/"+req.params.group_identifier+"/projects?per_page=1000",
      method: 'GET',
      headers: {"PRIVATE-TOKEN": global.gConfig.gitlab_token},
      rejectUnauthorized: false,
      resolveWithFullResponse: true,
      json: true
    }

    mr_opts = {
      method: 'GET',
      headers: {"PRIVATE-TOKEN": global.gConfig.gitlab_token},
      rejectUnauthorized: false,
      resolveWithFullResponse: true
    }



    const project_promise = new Promise((resolve, reject) => {
      return resolve(request_p(p_opts))
    })

    const ids_promise = project_promise.then(function(projects) {
      project_ids = []
      projects.body.forEach(project =>{
        project_ids.push(project.id)
      })
      return project_ids
    })

    const mr_promises = ids_promise.then(function(ids) {
      merge_req_promises = []
      ids.forEach(id =>{
        merge_req_promises.push(request_p(global.gConfig.gitlab_base_uri+"/api/v4/projects/"+id+"/merge_requests?state=opened&per_page=1000", mr_opts))
      })
      return Promise.all(merge_req_promises)
      .then(values => {
        return values  
      })
      .catch(err => {
        handleError(err, res)
      })
    })

    const promises = [project_promise, ids_promise, mr_promises]

    Promise.all(promises, res)
      .then(values => { 
        merge_requests = []
        values[2].forEach(mr => {
          merge_requests.push(JSON.parse(mr.body))
        })
        res 
          .status(200)
          .send(merge_requests.filter(v=>v.length))
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
      .send("FATAL UNHANDLED ERROR. UNABLE TO RECOVER: "+err)
  }
}
