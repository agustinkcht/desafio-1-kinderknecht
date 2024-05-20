import { Router } from "express";
import userManager from "../../data/mongo/managers/UserManager.mongo.js";
import isValidEmail from "../../middlewares/isValidEmail.mid.js";
import isValidData from "../../middlewares/isValidData.mid.js";
import isValidUser from "../../middlewares/isValidUser.mid.js";
import isValidPassword from "../../middlewares/isValidPassword.mid.js";

const sessionsRouter = Router();

sessionsRouter.post('/register', isValidData, isValidEmail, async (req, res, next) => {
    try {
        const data = req.body;
        await userManager.create(data);
        return res.json({ 
            statusCode: 201,
            message: 'User successfully registered.'
         });
    } catch (err) {
        return next(err);
    };
});
sessionsRouter.post('/login', isValidUser, isValidPassword, async (req, res, next) => {
    try {
        const { email } = req.body;
        const one = await userManager.readByEmail(email);
        req.session.email = email;
        req.session.role = one.role;
        req.session.user_id = one._id;
        req.session.online = true;
        return res.json({
            statusCode: 200,
            message: 'Access Granted'
        });
    } catch (err) {
        return next(err)    
    };
});
sessionsRouter.get('/online', async (req, res, next) => {
    try {
        if (req.session.online) {
            return res.json({
                statusCode: 200,
                message: 'Online',
                user_id: req.session.user_id,
                email: req.session.email
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