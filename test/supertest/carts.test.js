import { expect } from "chai";
import requester from "../../src/utils/requester.util.js";
import usersRepository from "../../src/repositories/users.rep.js";

describe(
    "Testing resource: CARTS",
    function() {
        const premiumUser = {
            email: "wendycarlos@gmail.com",
            password: "s3curep4ss"
        }
        const item1 = {
            product_id: "663ceb1057109ba2e5d3b595" // Roku Wireless Charging Pad
        }
        const item2 = {
            product_id: "663ceb1057109ba2e5d3b592" // Sennheiser Headphones
        }
        const item3 = {
            product_id: "663ceb1057109ba2e5d3b593" // Samsung Charging Stand
        }
        const item4 = {
            product_id: "663cea2c57109ba2e5d3b57d" // Iphone 8 (user's own product)
        }
        const itemData = {
            quantity: 2
        }
        let token // value set at login. you must set a cookie w/ this token when making not-public requests.
        let uid // user id
        let id_item1
        let id_item3

        it(
            "Log in with admin user to access the resource management",
            async() => {
                const response = await requester.post("/sessions/login").send(premiumUser)
                const { _body, headers } = response
                token = headers["set-cookie"][0].split(";")[0] // set token
                // retrieve logged user's id
                const getUserData = await usersRepository.readByEmailRepository(premiumUser.email)
                uid = getUserData._id
                expect(_body.statusCode).to.be.equals(200);
            }
        )
        // CRUD TEST ending in deleting the cart
        it(
            "Add item to the cart: Roku Wireless Charging Pad",
            async() => {
                const one = await requester
                .post("/carts")
                .send(item1)
                .set("Cookie", token)
                const { _body } = one
                id_item1 = _body.response._id
                expect(_body.statusCode).to.be.equals(201)
            }
        )
        it(
            "Add item to the cart: Sennheiser Headphones",
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
            "Add item to the cart: Samsung Charging Stand",
            async() => {
                const one = await requester
                .post("/carts")
                .send(item3)
                .set("Cookie", token)
                const { _body } = one
                id_item3 = _body.response._id
                expect(_body.statusCode).to.be.equals(201)
            }
        )
        it(
            "Try to add a user's own product to the cart: Iphone 8 (should fail)",
            async() => {
                const one = await requester
                .post("/carts")
                .send(item4)
                .set("Cookie", token)
                const { _body } = one
                expect(_body.statusCode).to.be.equals(403)
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
            "Read a cart item: Samsung Charging Stand",
            async() => {
                const one = await requester
                .get(`/carts/${id_item3}`)
                .set("Cookie", token)
                const { _body } = one
                expect(_body.statusCode).to.be.equals(200)
            }
        )
        it(
            "Update a cart item: Set quantity of Samsung Charging Stand to 2 units",
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
            "Delete a cart item: Roku Wireless Charging Pad",
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