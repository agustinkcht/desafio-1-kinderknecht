import assert from "assert"
import dao from "../../src/dao/dao.factory.js"

const { productManager } = dao

describe(
    "Testing PRODUCTS resource",
    () => {
        const data = { title: "Apple Airtag", category: "accessories" }
        let id;
        it(
            "The creation of a product receives an object with a _id prop",
            async () => {
                const response = await productManager.create(data)
                id = response._id; // set id value to have it for the next function
                assert.ok(response._id)
            }
        )
        it(
            "Testing product updates",
            async () => {
                const one = await productManager.readOne(id)
                const response = await productManager.update(id, { title: "Apple Airtag 2nd gen" })
                assert.notEqual(one.title, response.title)
            }
        )
        it(
            "Testing the deletion of a product",
            async () => {
                const response = await productManager.destroy(id)
                const check = await productManager.readOne(id)
                assert.ok(!check) // if check is false, the product has been deleted, so its ok
            }
        )
    }
)

