import { verifyToken } from "../utils/token.util.js";

function isAuth(req, res, next) {
    try {
        const { token } = req.cookies;
        const data = verifyToken(token);
        if (data) {
            req.user = data;
            return next();
        } else {
            const error = new Error('Forbidden Action');
            error.statusCode = 403;
            throw error;
        }   
    } catch (err) {
        console.log('JWT Verification Error:', err.message);
        return next(err);
    }
}

export default isAuth;