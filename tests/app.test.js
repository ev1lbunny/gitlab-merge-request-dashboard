/*eslint no-undef: "off"*/
/*eslint no-unused-vars: "off"*/
/*eslint no-console: ["error", { allow: [ "debug", "log"] }] */

const request = require('supertest')
const app = require('../src/app')
const groups = require('../src/config/group')
const projects = require('../src/config/project')

describe("Testing app base routes used for rendering PUG templates", () => {
    describe("routes: /", () => {
        test("GET should respond as expected with rendered homepage", async () => {
            const response = await request(app)
                .get("/")
            expect(response.status).toEqual(200)
            expect(response.type).toEqual("text/html")
            expect(response.text).toBeDefined()
            expect(response.text).toContain("GitLab Merge Dashboard")
        })
    })

    describe("routes: /health", () => {
        test("GET should respond as expected with stubbed 501 response", async () => {
            const response = await request(app)
                .get("/health")
            expect(response.status).toEqual(501)
            expect(response.type).toEqual("text/html")
            expect(response.text).toBeDefined()
        })
    })

    describe("routes: /config", () => {
        test("GET should respond as expected with stubbed 501 response", async () => {
            const response = await request(app)
                .get("/config")
            expect(response.status).toEqual(200)
            expect(response.type).toEqual("application/json")
            expect(response.text).toBeDefined()
        })
    })
})

describe("Testing app gitlab routes used for obtaining data from gitlab", () => {
    describe("routes: /gitlab/stale_branch_check_by_project_id/" + projects.ids[0], () => {
        test("GET should respond as expected successfully reading from app config using an id", async () => {
            const response = await request(app)
                .get("/gitlab/stale_branch_check_by_project_id/" + projects.ids[0])
            expect(response.status).toEqual(200)
            expect(response.type).toEqual("application/json")
            expect(response.text).toBeDefined()
        })
    })

    describe("routes: /gitlab/group/" + groups.groups[0].name, () => {
        test("GET should respond as expected successfully reading from app config using a name", async () => {
            const response = await request(app)
                .get("/gitlab/group/" + groups.groups[0].name)
            expect(response.status).toEqual(200)
            expect(response.type).toEqual("application/json")
            expect(response.text).toBeDefined()
        })
    })

    describe("routes: /gitlab/merge_requests_by_group_id/" + groups.groups[0].name, () => {
        test("GET should respond as expected successfully reading from app config using a name", async () => {
            const response = await request(app)
                .get("/gitlab/merge_requests_by_group_id/" + groups.groups[0].name)
            expect(response.status).toEqual(200)
            expect(response.type).toEqual("application/json")
            expect(response.text).toBeDefined()
        })
    })

    describe("routes: /gitlab/group/" + groups.groups[0].id, () => {
        test("GET should respond as expected successfully reading from app config using an id", async () => {
            const response = await request(app)
                .get("/gitlab/group/" + groups.groups[0].id)
            expect(response.status).toEqual(200)
            expect(response.type).toEqual("application/json")
            expect(response.text).toBeDefined()
        })
    })

    describe("routes: /gitlab/merge_requests_by_group_id/" + groups.groups[0].id, () => {
        test("GET should respond as expected successfully reading from app config using an id", async () => {
            const response = await request(app)
                .get("/gitlab/merge_requests_by_group_id/" + groups.groups[0].id)
            expect(response.status).toEqual(200)
            expect(response.type).toEqual("application/json")
            expect(response.text).toBeDefined()
        })
    })

})



//Needs proper unit testing stubbed responses to accurately test properly 
//Tests are currently basically just int tests not unit tests.  mocks needed to do unit tests properly
// //setting environment variables here for later testing 
// //as i'm not sure how else todo this. 
// process.env.MRDASH_TEST_GITLAB_BASE_URI = 'http://test'
// describe("Testing environment overrides.", () => {
//     describe("routes: /config/", () => {
//         test("MRDASH_TEST_GITLAB_BASE_URI should set override gitlab_base_uri for the specific enfironment.", async () => {

//             const response = await request(app)
//                 .get("/config")
//             expect(JSON.parse(response.text)['gitlab_base_uri']).toEqual("http://test")
//         })
//     })
// })
