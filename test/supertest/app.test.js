import { expect } from "chai";
import supertest from "supertest";
import environment from "../../src/utils/env.util.js"
import usersRepository from "../../src/repositories/users.rep.js";
import productsRepository from "../../src/repositories/products.rep.js"

const requester = supertest(`http://localhost:${environment.PORT}/api`)
// requester for making calls to the server

// test for: registering user, log in, create product, delete product, log out, delete user. 

describe(
    "Testing TechNode App",
    // here below, we have the function in charge of executing all test units
    // functions for testing must be inside this big function
    function () {
        this.timeout(20000)
        // defining data for testing
        const user = {
            email: "armandotesteos4@gmail.com",
            password: "S3curep4ss",
            firstName: "Armando",
            lastName: "Testeos",
            age: 54,
            role: 1,
            verified: true
        }
        const product = {
            title: "Airtag Keychain 2nd gen",
            category: "accessories",
            price: 60
        }
        let token
        let uid
        let pid
        // tests
        it(
            "Register a user",
            async() => {
                const response = await requester.post("/sessions/register").send(user)
                const { _body } = response // _body is the actual response
                const getUser = await usersRepository.readByEmailRepository(user.email) // getting user
                uid = getUser._id // setting UID (for deleting at the end)
                expect(_body.statusCode).to.be.equals(201);
            }
        )
        it(
            "User logs in",
            async() => {
                const response = await requester.post("/sessions/login").send(user)
                const { _body, headers } = response
                token = headers["set-cookie"][0].split(";")[0]
                // we split the first element of an array, after the ; the first element is the token
                expect(_body.statusCode).to.be.equals(200);
            }
        )
        it(
            "Create a product",
            async() => {
                const response = await requester
                  .post("/products")
                  .send(product)
                  .set("Cookie", token)
                const { _body } = response
                // retrieve product id
                const getProduct = await productsRepository.readRepository({ title: product.title })
                pid = getProduct[0]._id
                expect(_body.statusCode).to.be.equals(201)
            }
        )
        it(
            "Delete a product",
            async() => {
                const response = await requester
                  .delete(`/products/${pid}`)
                  .set("Cookie", token)
                const { _body } = response;
                expect(_body.statusCode).to.be.equals(200)
            }
        )
        it(
            "Delete user",
            async() => {
                const response = await requester.delete(`/users/${uid}`).set("Cookie", token)
                const { _body } = response
                expect(_body.statusCode).to.be.equals(200)
            }
        )
    }
)

// testing statusCode to be success is enough for ensuring a good testing
// (if you've got a good management of responses)
// you can also test: the response to be an array, words from the message, etc