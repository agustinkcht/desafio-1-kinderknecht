import CustomRouter from "../CustomRouter.js";
import { read, readOne, create, update, destroy, destroyAll } from "../../controllers/carts.controller.js"
import validator from "../../middlewares/joi.mid.js";
import cartSchema from "../../dao/schemas/cart.schema.js";

class CartsRouter extends CustomRouter {
  init() {
    this.read("/", ["USER", "ADMIN"], read);
    this.create("/", ["USER", "ADMIN"], validator(cartSchema), create);
    this.destroy("/all", ["USER", "ADMIN"], destroyAll);
    this.read("/:iid", ["USER", "ADMIN"], readOne); // item id
    this.update("/:iid", ["USER", "ADMIN"], update);
    this.destroy("/:iid", ["USER", "ADMIN"], destroy);
  }
}

const cartsRouter = new CartsRouter();
export default cartsRouter.getRouter();