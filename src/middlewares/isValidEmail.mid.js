import userManager from "../data/mongo/managers/UserManager.mongo.js";

async function isValidEmail (req, res, next) {
    try {
        const { email } = req.body;
        const one = await userManager.readByEmail(email);
        if (one) {
            const error = new Error ('Email already registered. Use a different email or log in')
            error.statusCode = 409;
            throw error;
        };
        return next();
    } catch (err) {
        return next(err)
    };
};

export default isValidEmail;

