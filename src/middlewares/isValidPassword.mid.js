import userManager from "../data/mongo/managers/UserManager.mongo.js";

async function isValidPassword (req, res, next) {
    try {
        const { email, password } = req.body;
        const one = await userManager.readByEmail(email);
        if (one.password === password) {
            return next()
        } else {
            const error = new Error('Invalid login data');
            error.statusCode = 401;
            throw error;
        };
    } catch (err) {
        return next(err)
    };
};

export default isValidPassword;

