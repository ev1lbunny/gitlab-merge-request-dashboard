const request = require('supertest')
const app = require('../src/app')
const groups = require('../src/config/group')

describe("Testing app base routes", () => {
    describe("routes: /", () => {
        test("GET should respond as expected", async () => {
            const response = await request(app)
                .get("/")
            expect(response.status).toEqual(200)
            expect(response.type).toEqual("text/html")
            expect(response.text).toBeDefined()
            expect(response.text).toContain("GitLab Merge Dashboard")
        })
    })
    
    describe("routes: /health", () => {
        test("GET should respond as expected", async () => {
            const response = await request(app)
                .get("/health")
            expect(response.status).toEqual(501)
            expect(response.type).toEqual("text/html")
            expect(response.text).toBeDefined()
        })
    })
    
    describe("routes: /config", () => {
        test("GET should respond as expected", async () => {
            const response = await request(app)
                .get("/config")
            expect(response.status).toEqual(501)
            expect(response.type).toEqual("text/html")
            expect(response.text).toBeDefined()
        })
    })

    describe("routes: /group/:group_identifier", () => {
        test("GET should respond as expected for valid group of: "+groups.names[0], async () => {
            const response = await request(app)
                .get("/group/"+groups.names[0])
            expect(response.status).toEqual(200)
            expect(response.type).toEqual("text/html")
            expect(response.text).toBeDefined()
        })
    })

})

describe("Testing app gitlab routes", () => {


})