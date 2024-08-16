import { expect } from "chai";
import dao from "../../src/dao/dao.factory.js";
const { productManager } = dao;

describe(
    "Testing PRODUCTS resource",
    () => {
        const data = { title: "Apple Airtag", category: "accessories" }
        let id;
        // obligatory values
        it(
            "Property TITLE must be a string",
            () => {
                expect(data.title).to.be.a("string")
            }
        )
        // testing CRUD
        it(
            "The creation of a product receives an object with a _id prop",
            async () => {
                const response = await productManager.create(data)
                id = response._id; // set id value to have it for the next function
                expect(response).to.have.property("_id")
            }
        )
        it(
            "Testing the update of a product",
            async () => {
                const one = await productManager.readOne(id)
                const response = await productManager.update(id, { title: "Apple Airtag 2nd gen" })
                expect(one.title).not.equal(response.name)
            }
        )
        it(
            "Testing the deletion of a product",
            async () => {
                const response = await productManager.destroy(id)
                const check = await productManager.readOne(id)
                expect(check).not.exist
            }
        )
    }
)