import { expect } from "chai";
import requester from "../../src/utils/requester.util.js";
import usersRepository from "../../src/repositories/users.rep.js";
import { verifyToken } from "../../src/utils/token.util.js";

describe(
    "Testing resource: SESSIONS",
    function() {
        this.timeout(20000)
        const user = {
            email: "alberteinstein6422@gmail.com",
            password: "S3curep4ss",
            firstName: "Albert",
            lastName: "Einstein",
            age: 54,
            role: 1
        }
        const newPassword = "S3curenewp4ss"
        let token
        let uid
        let verificationCode
        let recoveryToken
        let recoveryCode
        it(
            "Register a user",
            async() => {
                const response = await requester
                .post("/sessions/register")
                .send(user)
                const { _body } = response 
                // retrieve user data for the following tests
                const one = await usersRepository.readByEmailRepository(user.email)
                uid = one._id
                verificationCode = one.verificationCode
                expect(_body.statusCode).to.be.equals(201);
            }
        )
        it(
            "Verify the new user's account",
            async() => {
                const response = await requester
                .post("/sessions/verify")
                .send({ email: user.email, code: verificationCode })
                const { _body } = response
                expect(_body.statusCode).to.be.equals(200)
            }
        )
        it(
            "Log in with the new user",
            async() => {
                const response = await requester
                .post("/sessions/login")
                .send({email: user.email, password: user.password})
                const { _body, headers } = response
                token = headers["set-cookie"][0].split(";")[0]
                expect(_body.statusCode).to.be.equals(200);
            }
        )
        it(
            "Check online status, if online retrieve user data",
            async() => {
                const response = await requester
                .get("/sessions/online")
                .set("Cookie", token)
                const { _body } = response
                expect(_body.statusCode).to.be.equals(200) // expect online 
            }
        )
        it(
            "Log out",
            async() => {
                const response = await requester
                .post("/sessions/logout")
                .set("Cookie", token)
                const { _body } = response
                expect(_body.statusCode).to.be.equals(200)
            }
        )
        it(
            "Forgot password: Send recovery code to user's email for resetting password",
            async() => {
                const response = await requester
                .post("/sessions/password")
                .send({ email: user.email})
                const { _body, headers } = response
                recoveryToken = headers["set-cookie"][0].split(";")[0]
                const recoveryJWT = recoveryToken.split("=")[1]
                const data = verifyToken(recoveryJWT)
                recoveryCode = data.code
                expect(_body.statusCode).to.be.equals(200)
            }
        )
        it(
            "Reset user's password",
            async() => {
                const response = await requester
                .put("/sessions/password")
                .set("Cookie", recoveryToken)
                .send({ code: recoveryCode, password: newPassword })
                const { _body } = response
                expect(_body.statusCode).to.be.equals(200)
            }
        )
        it(
            "Log in using the new password",
            async() => {
                const response = await requester
                .post("/sessions/login")
                .send({ email: user.email, password: newPassword })
                const { _body } = response
                expect(_body.statusCode).to.be.equals(200);
            }
        )
        it(
            "Log out",
            async() => {
                const response = await requester
                .post("/sessions/logout")
                .set("Cookie", token)
                const { _body } = response
                expect(_body.statusCode).to.be.equals(200)
            }
        )
        it(
            "Delete user",
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



        // it(
        //     "Check online status, if online retrieve user data",
        //     async() => {
        //         const response = await requester
        //         .get("/sessions/online")
        //         const { _body } = response
        //         expect(_body.statusCode).to.be.equals(401) // expect offline
        //     }
        // )   