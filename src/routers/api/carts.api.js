import CustomRouter from "../CustomRouter.js";
import { read, readOne, create, update, destroy, destroyAll } from "../../controllers/carts.controller.js"
import isValidCart from "../../middlewares/isValidCart.mid.js";

class CartsRouter extends CustomRouter {
  init() {
    this.read("/", ["USER", "ADMIN"], read);
    this.create("/", ["USER", "ADMIN"], isValidCart, create);
    this.destroy("/all", ["USER", "ADMIN"], destroyAll);
    this.read("/:iid", ["USER", "ADMIN"], readOne); // item id
    this.update("/:iid", ["USER", "ADMIN"], update);
    this.destroy("/:iid", ["USER", "ADMIN"], destroy);
  }
}

const cartsRouter = new CartsRouter();
export default cartsRouter.getRouter();