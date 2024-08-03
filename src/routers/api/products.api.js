import CustomRouter from "../CustomRouter.js";
import { create, read, readOne, update, destroy } from "../../controllers/products.controller.js"
import validator from "../../middlewares/joi.mid.js";
import productSchema from "../../dao/schemas/product.schema.js";

class ProductsRouter extends CustomRouter {
  init() {
    this.create("/", ["ADMIN"], validator(productSchema), create);
    this.read("/", ["PUBLIC"], read);
    this.read("/:pid", ["PUBLIC"], readOne);
    this.update("/:pid", ["ADMIN"], update);
    this.destroy("/:pid", ["ADMIN"], destroy);
  }
}

const productsRouter = new ProductsRouter();
export default productsRouter.getRouter();