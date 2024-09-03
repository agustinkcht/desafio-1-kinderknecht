import { expect } from "chai";
import requester from "../../src/utils/requester.util.js";

describe(
    "Testing resource: PRODUCTS",
    function() {
        const premiumUser = {
            email: "wendycarlos@gmail.com",
            password: "s3curep4ss"
        }
        const product = {
            title: "Airtag Keychain 2nd gen",
            category: "accessories",
            price: 60
        }
        const productData = {
            price: 45
        }
        let token
        let pid
        it(
            "Log in with premium user to access the resource management",
            async() => {
                const response = await requester.post("/sessions/login").send(premiumUser)
                const { _body, headers } = response
                token = headers["set-cookie"][0].split(";")[0]
                expect(_body.statusCode).to.be.equals(200);
            }
        )
        it(
            "Read all products (should only retrieve products from other sellers)",
            async() => {
                const response = await requester
                  .get("/products")
                  .set("Cookie", token)
                const { _body } = response
                expect(_body.statusCode).to.be.equals(200)
            }
        )
        it(
            "Read all products filtering by category (should only retrieve products from other sellers)",
            async() => {
                const response = await requester
                  .get("/products?category=headphones")
                  .set("Cookie", token)
                const { _body } = response
                expect(_body.statusCode).to.be.equals(200)
            }
        )
        it(
            "Read all MY products (should only retrieve products published by the user)",
            async() => {
                const response = await requester
                  .get("/products/me")
                  .set("Cookie", token)
                const { _body } = response
                expect(_body.statusCode).to.be.equals(200)
            }
        )
        it(
            "Create a new product",
            async() => {
                const one = await requester
                  .post("/products")
                  .send(product)
                  .set("Cookie", token)
                const { _body } = one
                // set variable UID for the next tests
                pid = _body.response._id
                expect(_body.statusCode).to.be.equals(201)
            }
        )
        it(
            "Read one product",
            async() => {
                const one = await requester
                .get(`/products/${pid}`)
                .set("Cookie", token)
                const { _body } = one
                expect(_body.statusCode).to.be.equals(200)
            }
        )
        it(
            "Update a product",
            async() => {
                const one = await requester
                .put(`/products/${pid}`)
                .send(productData)
                .set("Cookie", token)
                const { _body } = one
                expect(_body.statusCode).to.be.equals(200)
            }
        )
        it(
            "Delete a product",
            async() => {
                const one = await requester
                .delete(`/products/${pid}`)
                .set("Cookie", token)
                const { _body } = one
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