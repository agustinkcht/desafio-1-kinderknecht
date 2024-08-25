import CustomRouter from "../CustomRouter.js";
import { create, read, readOne, update, destroy } from "../../controllers/products.controller.js"
import validator from "../../middlewares/joi.mid.js";
import productSchema from "../../dao/schemas/product.schema.js";

class ProductsRouter extends CustomRouter {
  init() {
    this.create("/", ["ADMIN", "PREMIUM"], validator(productSchema), create);
    this.read("/", ["PUBLIC"], read);
    this.read("/:pid", ["PUBLIC"], readOne);
    this.update("/:pid", ["ADMIN", "PREMIUM"], update);
    this.destroy("/:pid", ["ADMIN", "PREMIUM"], destroy);
  }
}

const productsRouter = new ProductsRouter();
export default productsRouter.getRouter();