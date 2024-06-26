import CustomRouter from "../CustomRouter.js";
import { read, readOne, create, update, destroy, destroyAll } from "../../controllers/carts.controller.js"

class CartsRouter extends CustomRouter {
  init() {
    this.read("/", ["PUBLIC"], read);
    this.create("/", ["PUBLIC"], create);
    this.destroy("/all", ["USER", "ADMIN"], destroyAll);
    this.read("/:iid", ["PUBLIC"], readOne); // item id
    this.update("/:iid", ["PUBLIC"], update);
    this.destroy("/:iid", ["PUBLIC"], destroy);
  }
}

const cartsRouter = new CartsRouter();
export default cartsRouter.getRouter();