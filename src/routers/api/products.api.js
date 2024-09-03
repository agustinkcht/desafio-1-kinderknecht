import CustomRouter from "../CustomRouter.js";
import { create, read, readMine, readOne, update, destroy } from "../../controllers/products.controller.js"
import validator from "../../middlewares/joi.mid.js";
import productSchema from "../../dao/schemas/product.schema.js";
import { isManagementPermitted } from "../../middlewares/isActionPermitted.js";

class ProductsRouter extends CustomRouter {
  init() {
    this.create("/", ["ADMIN", "PREMIUM"], validator(productSchema), create);
    this.read("/", ["PUBLIC"], read);
    this.read("/me", ["PREMIUM"], readMine);
    this.read("/:pid", ["PUBLIC"], readOne);
    this.update("/:pid", ["ADMIN", "PREMIUM"], isManagementPermitted, update);
    this.destroy("/:pid", ["ADMIN", "PREMIUM"], isManagementPermitted, destroy);
  }
}

const productsRouter = new ProductsRouter();
export default productsRouter.getRouter();