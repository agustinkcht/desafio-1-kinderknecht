import { expect } from "chai";
import requester from "../../src/utils/requester.util.js";
import usersRepository from "../../src/repositories/users.rep.js";

describe(
    "Testing resource: CARTS",
    function() {
        const adminUser = {
            email: "wendycarlos@gmail.com",
            password: "s3curep4ss"
        }
        const item1 = {
            user_id: "66918b794d21c1bc0efdd69e", // wendy carlos
            product_id: "663cea2c57109ba2e5d3b573" // iPhone 15 pro 
        }
        const item2 = {
            user_id: "66918b794d21c1bc0efdd69e", // wendy carlos
            product_id: "663cea2c57109ba2e5d3b575" // apple watch 9
        }
        const item3 = {
            user_id: "66918b794d21c1bc0efdd69e", // wendy carlos
            product_id: "663cea2c57109ba2e5d3b583" // aw sport loop band
        }
        const itemData = {
            quantity: 2
        }
        let token // value set at login. you must set a cookie w/ this token when making not-public requests.
        let uid // user id
        let id_item1 // item id
        let id_item3
        it(
            "Log in with admin user to access the resource management",
            async() => {
                const response = await requester.post("/sessions/login").send(adminUser)
                const { _body, headers } = response
                token = headers["set-cookie"][0].split(";")[0] // set token
                // retrieve logged user's id
                const getUserData = await usersRepository.readByEmailRepository(adminUser.email)
                uid = getUserData._id
                expect(_body.statusCode).to.be.equals(200);
            }
        )
        // CRUD TEST ending in deleting the cart
        it(
            "Create a cart item: iPhone 15 pro",
            async() => {
                const one = await requester
                .post("/carts")
                .send(item1)
                .set("Cookie", token)
                const { _body } = one
                id_item1 = _body.response._id // set item ID for future requests
                expect(_body.statusCode).to.be.equals(201)
            }
        )
        it(
            "Create a cart item: Apple Watch 9",
            async() => {
                const one = await requester
                .post("/carts")
                .send(item2)
                .set("Cookie", token)
                const { _body } = one
                expect(_body.statusCode).to.be.equals(201)
            }
        )
        it(
            "Create a cart item: Sport Loop Band for Apple Watch",
            async() => {
                const one = await requester
                .post("/carts")
                .send(item3)
                .set("Cookie", token)
                const { _body } = one
                id_item3 = _body.response._id // set item ID for future requests
                expect(_body.statusCode).to.be.equals(201)
            }
        )
        it(
            "Read the entire cart of a user",
            async() => {
                const one = await requester
                .get(`/carts?${uid}`)
                .set("Cookie", token)
                const { _body } = one
                expect(_body.statusCode).to.be.equals(200)
            }
        )
        it(
            "Read a cart item: Sport Loop Band for Apple Watch",
            async() => {
                const one = await requester
                .get(`/carts/${id_item3}`)
                .set("Cookie", token)
                const { _body } = one
                expect(_body.statusCode).to.be.equals(200)
            }
        )
        it(
            "Update a cart item: Quantity",
            async() => {
                const one = await requester
                .put(`/carts/${id_item3}`)
                .send(itemData)
                .set("Cookie", token)
                const { _body } = one
                expect(_body.statusCode).to.be.equals(200)
            }
        )
        it(
            "Delete a cart item: iPhone 15 pro ",
            async() => {
                const one = await requester
                .delete(`/carts/${id_item1}`)
                .set("Cookie", token)
                const { _body } = one
                expect(_body.statusCode).to.be.equals(200)
            }
        )
        it(
            "Generate ticket for checkout",
            async() => {
                const one = await requester
                .get("/tickets")
                .set("Cookie", token)
                const { _body } = one
                expect(_body.statusCode).to.be.equals(200)
            }
        )
        it(
            "Delete the entire cart of a user",
            async() => {
                const all = await requester
                .delete("/carts/all")
                .set("Cookie", token)
                const { _body } = all
                expect(_body.statusCode).to.be.equals(200)
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
    }
)