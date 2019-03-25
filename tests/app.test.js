const request = require('supertest')
const app = require('../src/app')


describe("routes: /", () => {
    test("GET should respond as expected", async () => {
        const response = await request(app)
        .get("/")
        expect(response.status).toEqual(200)
        expect(response.type).toEqual("text/html")
        expect(response.text).toContain("GitLab Merge Dashboard")
        expect(response.text).toContain("HELLO PUG")
    })
})

describe("routes: /health", () => {
    test("GET should respond as expected", async () => {
        const response = await request(app)
        .get("/health")
        expect(response.status).toEqual(200)
        expect(response.type).toEqual("application/json")
        expect(response.text).toBeDefined()
    })
})

describe("routes: /config", () => {
    test("GET should respond as expected", async () => {
        const response = await request(app)
        .get("/config")
        expect(response.status).toEqual(200)
        expect(response.type).toEqual("application/json")
        expect(response.text).toContain("config_id")
        expect(response.text).toContain("gitlab_user")
        expect(response.text).toContain("gitlab_token")
        expect(response.text).toContain("gitlab_base_uri")
        expect(response.text).toContain("port")
        expect(response.text).toBeDefined()
    })
})