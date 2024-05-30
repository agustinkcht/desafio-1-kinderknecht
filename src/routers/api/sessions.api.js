import { Router } from "express";
import passport from "../../middlewares/passport.mid.js";
//import isAuth from "../../middlewares/isAuth.mid.js";
import passportCb from "../../middlewares/passportCb.mid.js";

const sessionsRouter = Router();

sessionsRouter.post('/register', 
    //passport.authenticate('register', { session: false }), 
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
    //passport.authenticate('login', { session: false }), 
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
    //passport.authenticate('jwt', { session: false }), 
    passportCb('jwt'),
    async (req, res, next) => {
    try {
        if (req.user.online) {
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
    (req, res, next) => {
    try {
        if (req.session.online) {
            req.session.destroy();
        } else {
            const error = new Error('No session opened')
            error.statusCode = 401;
            throw error;
        }
        return res.json({
            statusCode: 200,
            message: 'Session Closed'
        });  
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