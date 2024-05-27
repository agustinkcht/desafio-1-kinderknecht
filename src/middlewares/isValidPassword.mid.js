import userManager from "../data/mongo/managers/UserManager.mongo.js";
import { verifyHash } from "../utils/hash.util.js";

async function isValidPassword (req, res, next) {
    try {
        const { email, password } = req.body;
        const one = await userManager.readByEmail(email);
        const verify = verifyHash(password, one.password);
        if (verify) {
            return next()
        } else {
            const error = new Error('Invalid Credentials');
            error.statusCode = 401;
            throw error;
        };
    } catch (err) {
        return next(err)
    };
};

export default isValidPassword;

