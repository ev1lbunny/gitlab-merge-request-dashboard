/*eslint no-console: ["error", { allow: ["error"] }] */

const express = require('express')
const gitlab_router = express.Router()

/* Controllers */
const gitlab_controller = require('../controllers/gitlabController')

gitlab_router.get('/merge_requests_by_project/:project_id', gitlab_controller.merge_requests_by_project_id)
gitlab_router.get('/projects/:group_identifier', gitlab_controller.projects_by_group_identifier)
gitlab_router.get('/group/:group_identifier', gitlab_controller.group_by_identifier)
gitlab_router.get('/merge_requests_by_group/:group_identifier', gitlab_controller.merge_requests_by_group)
gitlab_router.get('/stale_branch_check_by_project_id/:project_id', gitlab_controller.stale_branch_check_by_project_id)

module.exports = gitlab_router