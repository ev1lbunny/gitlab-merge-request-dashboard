/*eslint no-undef: "off"*/
/*eslint no-unused-vars: "off"*/

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
            expect(response.status).toEqual(501)
            expect(response.type).toEqual("text/html")
            expect(response.text).toBeDefined()
        })
    })
})

describe("Testing app gitlab routes used for obtaining data from gitlab", () => {
    describe("routes: /gitlab/projects/" + groups.names[0], () => {
        test("GET should respond as expected successfully reading from app config using a name", async () => {
            const response = await request(app)
                .get("/gitlab/projects/" + groups.names[0])
            expect(response.status).toEqual(200)
            expect(response.type).toEqual("application/json")
            expect(response.text).toBeDefined()
        })
    })

    describe("routes: /gitlab/stale_branch_check_by_project_id/" + projects.ids[0], () => {
        test("GET should respond as expected successfully reading from app config using an id", async () => {
            const response = await request(app)
                .get("/gitlab/stale_branch_check_by_project_id/" + projects.ids[0])
            expect(response.status).toEqual(200)
            expect(response.type).toEqual("application/json")
            expect(response.text).toBeDefined()
        })
    })

    describe("routes: /gitlab/merge_reqests_by_project/" + projects.ids[0], () => {
        test("GET should respond as expected successfully reading from app config using an id", async () => {
            const response = await request(app)
                .get("/gitlab/merge_requests_by_project/" + projects.ids[0])
            expect(response.status).toEqual(200)
            expect(response.type).toEqual("application/json")
            expect(response.text).toBeDefined()
        })
    })

    describe("routes: /gitlab/group/" + groups.names[0], () => {
        test("GET should respond as expected successfully reading from app config using a name", async () => {
            const response = await request(app)
                .get("/gitlab/group/" + groups.names[0])
            expect(response.status).toEqual(200)
            expect(response.type).toEqual("application/json")
            expect(response.text).toBeDefined()
        })
    })

    describe("routes: /gitlab/merge_requests_by_group/" + groups.names[0], () => {
        test("GET should respond as expected successfully reading from app config using a name", async () => {
            const response = await request(app)
                .get("/gitlab/merge_requests_by_group/" + groups.names[0])
            expect(response.status).toEqual(200)
            expect(response.type).toEqual("application/json")
            expect(response.text).toBeDefined()
        })
    })

    describe("routes: /gitlab/projects/" + groups.ids[0], () => {
        test("GET should respond as expected successfully reading from app config using an id", async () => {
            const response = await request(app)
                .get("/gitlab/projects/" + groups.ids[0])
            expect(response.status).toEqual(200)
            expect(response.type).toEqual("application/json")
            expect(response.text).toBeDefined()
        })
    })

    describe("routes: /gitlab/group/" + groups.ids[0], () => {
        test("GET should respond as expected successfully reading from app config using an id", async () => {
            const response = await request(app)
                .get("/gitlab/group/" + groups.ids[0])
            expect(response.status).toEqual(200)
            expect(response.type).toEqual("application/json")
            expect(response.text).toBeDefined()
        })
    })

    describe("routes: /gitlab/merge_requests_by_group/" + groups.ids[0], () => {
        test("GET should respond as expected successfully reading from app config using an id", async () => {
            const response = await request(app)
                .get("/gitlab/merge_requests_by_group/" + groups.ids[0])
            expect(response.status).toEqual(200)
            expect(response.type).toEqual("application/json")
            expect(response.text).toBeDefined()
        })
    })
})