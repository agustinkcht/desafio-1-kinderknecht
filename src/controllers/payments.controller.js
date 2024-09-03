import { createService } from "../services/payments.service.js";

const createPayment = async (req, res, next) => {
    try {
        const user_id = req.user._id; // brught from session
        const response = await createService({ user_id });
        return res.json(response.url); // url to Stripe
    } catch (err) {
        return next(err);
    }
} 

export { createPayment };

