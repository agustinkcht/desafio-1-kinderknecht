import CustomRouter from "../CustomRouter.js";
import isValidData from "../../middlewares/isValidData.mid.js";
import { create, read, readOne, update, destroy, readByEmail } from "../../controllers/users.controller.js";

class UsersRouter extends CustomRouter {
  init() {
    this.create("/", ["PUBLIC"], isValidData, create);
    this.read("/", ["USER", "ADMIN"], read);
    this.read("/email/:email", ["USER", "ADMIN"], readByEmail);
    this.read("/:uid", ["USER", "ADMIN"], readOne);
    this.update("/:uid", ["USER", "ADMIN"], update);
    this.destroy("/:uid", ["USER", "ADMIN"], destroy);
  }
}

const usersRouter = new UsersRouter();
export default usersRouter.getRouter();