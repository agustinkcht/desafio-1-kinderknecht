import CustomRouter from "../CustomRouter.js";
import productsRouter from "./products.api.js";
import usersRouter from "./users.api.js";
import cartsRouter from "./carts.api.js";
import sessionsRouter from "./sessions.api.js";
import ticketsRouter from "./tickets.api.js";
import paymentsRouter from "./payments.api.js";
import loggersRouter from "./loggers.api.js";

class ApiRouter extends CustomRouter {
  init() {
    this.use("/products", productsRouter);
    this.use("/users", usersRouter);
    this.use("/carts", cartsRouter);
    this.use("/sessions", sessionsRouter);
    this.use("/tickets", ticketsRouter);
    this.use("/payments", paymentsRouter);
    this.use("/loggers", loggersRouter);
  }
}

const apiRouter = new ApiRouter();
export default apiRouter.getRouter();