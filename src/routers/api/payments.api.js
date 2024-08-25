import { createPayment } from "../../controllers/payments.controller.js";
import CustomRouter from "../CustomRouter.js";

class PaymentsRouter extends CustomRouter {
    init() {
        this.create("/", ["USER", "PREMIUM"], createPayment)
    }
}

const paymentsRouter = new PaymentsRouter();
export default paymentsRouter.getRouter()

