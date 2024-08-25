import CustomRouter from "../CustomRouter.js";
import { read, readOne, create, update, destroy, destroyAll } from "../../controllers/carts.controller.js"
import validator from "../../middlewares/joi.mid.js";
import cartSchema from "../../dao/schemas/cart.schema.js";

class CartsRouter extends CustomRouter {
  init() {
    this.read("/", ["USER", "PREMIUM"], read);
    this.create("/", ["USER", "PREMIUM"], validator(cartSchema), create);
    this.destroy("/all", ["USER", "PREMIUM"], destroyAll);
    this.read("/:iid", ["USER", "PREMIUM"], readOne); // item id
    this.update("/:iid", ["USER", "PREMIUM"], update);
    this.destroy("/:iid", ["USER", "PREMIUM"], destroy);
  }
}

const cartsRouter = new CartsRouter();
export default cartsRouter.getRouter();