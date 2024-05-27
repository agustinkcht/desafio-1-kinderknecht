import { Router } from "express";

const cookiesRouter = Router();

cookiesRouter.get('/set', (req, res, next) => {
    try {
        return res
        .cookie('modo', 'nocturno', { maxAge: 100000 })
        .cookie('online', 'true', { maxAge: 60 * 60 * 1000 })
        .json({ message: 'Primera vence en 10s, segunda en 1h'});
    } catch(err) {
        return next(err)
    };
});

cookiesRouter.get('/', (req, res, next) => {
    try {
        const cookies = req.cookies
        return res.json({cookies})
    } catch(err) {
        return next(err);
    };
});

cookiesRouter.get('/destroy/:cookie', (req, res, next) => {
    try {
        const { cookie } = req.params;
        return res
        .clearCookie(cookie)
        .json({ message: `cookie ${cookie} deleted`})
    } catch(err) {
        return next(err)
    };
});

cookiesRouter.get('/signed', (req, res, next) => {
    try {
        return res
        .cookie('role', 'admin', { signed: true })
        .json({ message: 'cookie signed with user role' })
    } catch(err) {
        return next(err)
    };
});

cookiesRouter.get('/get-signed', (req, res, next) => {
    try {
        return res.json({ message: req.signedCookies }) 
    } catch (err) {
        return next(err)
    };
});

export default cookiesRouter;