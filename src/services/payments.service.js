import { createRepository } from "../repositories/payments.rep.js";

const createService = async (user_id) => {
    try {
        const response = await createRepository(user_id);
        return response;
    } catch (err) {
        throw err;
    }
}

export { createService };

