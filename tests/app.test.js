const request = require('supertest')
const app = require('../src/app')

const mockRequest = (req, group) => {
    return {
        req: { groups: require('../config/group'), selected_group: group, merge_requests: require() },
    }
}

const mockResponse = () => {
    const res = {}
        res.status = jest.fn().mockReturnValue(res)
        res.json = jest.fn().mockReturnValue(res)
    return res
}



describe("Testing app base routes", () => {
    describe("routes: /", () => {
        test("GET should respond as expected", async () => {
            const response = await request(app)
                .get("/")
            expect(response.status).toEqual(200)
            expect(response.type).toEqual("text/html")
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

})