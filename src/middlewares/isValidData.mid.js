import userManager from "../data/mongo/managers/UserManager.mongo.js";

async function isValidData (req, res, next) {
    try {
        const { email, password } = req.body;
        if (!email) {
            const error = new Error('Enter a valid email');
            error.statusCode = 400;
            throw error;
        };
        if (!password) {
            const error = new Error('Enter a valid password');
            error.statusCode = 400;
            throw error;
        };
        return next() 
    } catch (err) {
        return next(err);
    };
};

export default isValidData;