/*eslint no-console: ["error", { allow: ["error"] }] */

const express = require('express')
const gitlab_router = express.Router()

/* Controllers */
const gitlab_controller = require('../controllers/gitlabController')

gitlab_router.get('/group/:group_id', gitlab_controller.group_by_group_id)
gitlab_router.get('/merge_requests_by_group_id/:group_id', gitlab_controller.merge_requests_by_group_id)
gitlab_router.get('/stale_branch_check_by_project_id/:project_id', gitlab_controller.stale_branch_check_by_project_id)

module.exports = gitlab_router