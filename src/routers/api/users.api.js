import CustomRouter from "../CustomRouter.js";
import isValidData from "../../middlewares/isValidData.mid.js";
import { create, read, readOne, update, destroy, readByEmail } from "../../controllers/users.controller.js";

class UsersRouter extends CustomRouter {
  init() {
    this.create("/", ["PUBLIC"], isValidData, create);
    this.read("/", ["PUBLIC"], read);
    this.read("/email/:email", ["PUBLIC"], readByEmail);
    this.read("/:uid", ["PUBLIC"], readOne);
    this.update("/:uid", ["PUBLIC"], update);
    this.destroy("/:uid", ["PUBLIC"], destroy);
  }
}

const usersRouter = new UsersRouter();
export default usersRouter.getRouter();