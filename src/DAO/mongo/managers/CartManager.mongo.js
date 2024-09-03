import Manager from "../Manager.mongo.js";
import Cart from "../models/cart.model.js";

const cartManager = new Manager(Cart);

export default cartManager;