import { verifyToken } from "../utils/token.util.js";

async function isValidAdmin (req, res, next) {
    try {
        const { token } = req.cookies;
        const data = verifyToken(token);
        const { role } = data;
        console.log(role)
        if(role === '1') {
            return next()
        } else {
            return res.err403mes("Action not allowed");
        }
    } catch (err) {
        return next(err);
    };
};

export default isValidAdmin;

