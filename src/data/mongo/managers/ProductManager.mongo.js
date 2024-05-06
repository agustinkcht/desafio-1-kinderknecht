import Manager from "../manager.mongo.js";
import Product from "../models/product.model.js";

const productManager = new Manager(Product);

export default productManager;