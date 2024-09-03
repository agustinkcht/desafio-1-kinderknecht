import { readOneService as readOneUser } from "../services/users.service.js";
import { readOneService as readOneProduct } from "../services/products.service.js";

async function getUser (user_id) {
    try {
        const user = await readOneUser(user_id)
        return user;
    } catch (err) {
        console.log(err);
    }
}

async function getProduct (product_id) {
    try {
        const product = await readOneProduct(product_id)
        return product;
    } catch (err) {
        console.log(err) 
    }
}

export { getUser, getProduct };