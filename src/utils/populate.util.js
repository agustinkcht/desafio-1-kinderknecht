import { getUser, getProduct } from "./getResource.util.js";

async function populateUser(arrayOfItems) {
  const userIds = arrayOfItems.map((item) => item.user_id);
  const userPromises = userIds.map((user_id) => getUser(user_id));
  try {
    const users = await Promise.all(userPromises);
    return users;
  } catch (err) {
    console.log(err);
    throw err;
  }
} // returns array of users

async function populateProduct(arrayOfItems) {
  const productIds = arrayOfItems.map((item) => item.product_id);
  const productPromises = productIds.map((product_id) =>
    getProduct(product_id)
  );
  try {
    const products = await Promise.all(productPromises);
    return products;
  } catch (err) {
    console.log(err);
    throw err;
  }
} // returns array of products

export { populateUser, populateProduct };
