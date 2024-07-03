import CustomRouter from "../CustomRouter.js";
//import isValidAdmin from "../../middlewares/isValidAdmin.mid.js";
import isValidProduct from "../../middlewares/isValidProduct.mid.js";
import { create, read, readOne, update, destroy } from "../../controllers/products.controller.js"

class ProductsRouter extends CustomRouter {
  init() {
    this.create("/", ["ADMIN"], isValidProduct, create);
    this.read("/", ["PUBLIC"], read);
    this.read("/:pid", ["PUBLIC"], readOne);
    this.update("/:pid", ["ADMIN"], update);
    this.destroy("/:pid", ["ADMIN"], destroy);
  }
}

const productsRouter = new ProductsRouter();
export default productsRouter.getRouter();