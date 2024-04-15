import { Router } from "express";
import userManager from "../../data/fs/files/UserManager.fs.js";

const usersViewRouter = Router();

usersViewRouter.get('/register', (req, res, next) => {
    try {
        return res.render('register', { title: 'Register' })
    } catch(err) {
        return next(err);
    };
});

usersViewRouter.get('/:uid', async(req, res, next) => {
    try {
        const { uid } = req.params;
        const selected = await userManager.readOne(uid);
        return res.render('userDetail', { user: selected });
    } catch(err) {
        return next(err);
    };
});

export default usersViewRouter;