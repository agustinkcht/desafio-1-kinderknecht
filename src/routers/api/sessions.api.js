import { Router } from "express";
import userManager from "../../data/mongo/managers/UserManager.mongo.js";

const sessionsRouter = Router();

sessionsRouter.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const one = await userManager.readByEmail(email);
        if (one.password === password) {
            req.session.email = email;
            req.session.role = one.role;
            req.session.user_id = one._id;
            req.session.online = true;
            return res.json({
                statusCode: 200,
                message: 'Logged In'
            });
        } else {
            return res.json({
                statusCode: 401,
                message: 'Bad Auth'
            });
        };
    } catch (err) {
        return next(err)    
    };
});
sessionsRouter.get('/online', async (req, res, next) => {
    try {
        if (req.session.online) {
            return res.json({
                statusCode: 200,
                message: 'User Online',
                user_id: req.session.user_id,
                email: req.session.email
            });
        } else {
            return res.json({
                statusCode: 401,
                message: 'Bad Auth'
            });
        };
    } catch (err) {
        return next(err)      
    };
});
sessionsRouter.post('/logout', (req, res, next) => {
    try {
        req.session.destroy()
        return res.json({
            statusCode: 200,
            message: 'Logged Out'
        });  
    } catch (err) {
        return next(err)     
    };
});

export default sessionsRouter;