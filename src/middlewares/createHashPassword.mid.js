import { createHash } from "../utils/hash.util.js";

function createHashPassword(req, res, next) {
    try {
        const { password } = req.body;
        const hashPassword = createHash(password);
        req.body.password = hashPassword;
        return next();
    } catch (err) {
        return next(err) 
    };
};

export default createHashPassword;