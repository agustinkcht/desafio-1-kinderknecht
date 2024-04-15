import { Router } from "express";
import productManager from "../../data/fs/files/ProductManager.fs.js";
import productsViewRouter from "./products.view.js";
import usersViewRouter from "./users.view.js";

const viewsRouter = Router();

viewsRouter.use('/products', productsViewRouter);
viewsRouter.use('/users', usersViewRouter);
viewsRouter.get('/', async (req, res, next) => {
    try {
        const allProducts = await productManager.read();
        return res.render('index', { title: 'Home', allProducts });
    } catch(err) {
        return next(err);
    };
});


export default viewsRouter;