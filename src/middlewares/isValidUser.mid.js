import userManager from "../data/mongo/managers/UserManager.mongo.js";

async function isValidUser (req, res, next) {
    try {
        const { email } = req.body;
        const one = await userManager.readByEmail(email);
        if (!one) {
            const error = new Error ('Bad auth from login. Try again.')
            error.statusCode = 401;
            throw error;
        };
        return next();
    } catch (err) {
        return next(err)
    };
};

export default isValidUser;

