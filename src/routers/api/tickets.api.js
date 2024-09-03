import CustomRouter from "../CustomRouter.js";
import generateTicket from "../../controllers/tickets.controller.js";

class TicketsRouter extends CustomRouter {
  init() {
    this.read("/", ["USER", "PREMIUM"], generateTicket);
  };
};

const ticketsRouter = new TicketsRouter();
export default ticketsRouter.getRouter();