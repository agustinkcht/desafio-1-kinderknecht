import { expect } from "chai";
import requester from "../../src/utils/requester.util.js";

describe(
    "Testing resource: USERS",
    function () {
        const adminUser = {
            email: "bobmoog@gmail.com",
            password: "s3curep4ss"
        }
        const user = {
            email: "alberteinstein5@gmail.com",
            password: "S3curep4ss",
            firstName: "Albert",
            lastName: "Einstein",
            age: 54,
            role: 1,
            verified: true
        }
        const userData = {
            firstName: "Alberto",
            age: 99
        }
        let token
        let uid
        // LOGIN for permissions
        it(
            "Log in with admin user to access the resource management",
            async() => {
                const response = await requester.post("/sessions/login").send(adminUser)
                const { _body, headers } = response
                token = headers["set-cookie"][0].split(";")[0]
                expect(_body.statusCode).to.be.equals(200);
            }
        )
        // CRUD TEST
        it(
            "Create a new user",
            async() => {
                const one = await requester
                  .post("/users")
                  .send(user)
                  .set("Cookie", token)
                const { _body } = one
                // set variable UID for the next tests
                uid = _body.response._id
                expect(_body.statusCode).to.be.equals(201)
            }
        )
        it(
            "Read all users",
            async() => {
                const response = await requester
                  .get("/users")
                  .set("Cookie", token)
                const { _body } = response
                expect(_body.statusCode).to.be.equals(200)
            }
        )
        it(
            "Read all users filtering by role",
            async() => {
                const response = await requester
                  .get("/users?role=1")
                  .set("Cookie", token)
                const { _body } = response
                expect(_body.statusCode).to.be.equals(200)
            }
        )
        it(
            "Read one user",
            async() => {
                const one = await requester
                .get(`/users/${uid}`)
                .set("Cookie", token)
                const { _body } = one
                expect(_body.statusCode).to.be.equals(200)
            }
        )
        it(
            "Update a user",
            async() => {
                const one = await requester
                .put(`/users/${uid}`)
                .send(userData)
                .set("Cookie", token)
                const { _body } = one
                expect(_body.statusCode).to.be.equals(200)
            }
        )
        it(
            "Delete a user",
            async() => {
                const one = await requester
                .delete(`/users/${uid}`)
                .set("Cookie", token)
                const { _body } = one
                expect(_body.statusCode).to.be.equals(200)
            }
        )
    }
)

