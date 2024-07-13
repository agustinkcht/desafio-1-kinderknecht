import { faker } from "@faker-js/faker";
import dbConnect from "../utils/dbConnect.util.js";
import productsRepository from "../repositories/products.rep.js";

// mock with product.model as a guide

async function createData() {
  try {
    dbConnect(); // because this file is executed outside the server.
    for (let i = 1; i <= 50; i++) {
      // creating properties
      const title = faker.commerce.productName();
      const category = faker.commerce.product();
      const price = faker.commerce.price({ min: 19, max: 2300, dec: 0 });
      const stock = faker.number.int({ min: 1, max: 500 });
      // creating product object
      const product = { title, category, price, stock };
      // create with repository
      await productsRepository.createRepository(product);
    }
    console.log("Products Created");
  } catch (err) {
    console.log(err);
  }
}

createData();

