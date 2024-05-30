import { Router } from "express";
import passport from "../../middlewares/passport.mid.js";
import passportCb from "../../middlewares/passportCb.mid.js";

const sessionsRouter = Router();

sessionsRouter.post('/register', 
    passportCb('register'),
    async (req, res, next) => {
    try {
        return res.json({ 
            statusCode: 201,
            message: 'User successfully registered.'
         });
    } catch (err) {
        return next(err);
    };
});
sessionsRouter.post('/login', 
    passportCb('login'),
    async (req, res, next) => {
    try {
        return res.cookie('token', req.user.token, { signedCookie: true }).json({
            statusCode: 200,
            message: 'Session Initialized',
            token: req.user.token,
        });
    } catch (err) {
        return next(err)    
    };
});
sessionsRouter.get('/online', 
    passportCb('jwt'),
    async (req, res, next) => {
    try {
        if (req.user && req.user.online) {
            return res.json({
                statusCode: 200,
                message: 'Online',
                user_id: req.user._id,
                email: req.user.email
            });
        } else {
            return res.json({
                statusCode: 401,
                message: 'Offline'
            });
        };
    } catch (err) {
        return next(err)      
    };
});
sessionsRouter.post('/logout', 
    passportCb('jwt'),
    (req, res, next) => {
    try {
        if (req.user.online) {
            res.clearCookie('token');
            return res.json({
                statusCode: 200,
                message: 'Session Closed'
            });
        } else {
            const error = new Error('No session opened')
            error.statusCode = 401;
            throw error;
        }
    } catch (err) {
        return next(err)     
    };
});
sessionsRouter.get('/google',
 passport.authenticate('google', { scope: ['email', 'profile'] })
);
sessionsRouter.get('/google/callback', 
passport.authenticate('google', { session: false }),
(req, res, next) => {
    try {
        return res.json({
            statusCode: 200,
            message: 'Logged in with google'
        });  
    } catch (err) {
        return next(err)  
    };
});

export default sessionsRouter;