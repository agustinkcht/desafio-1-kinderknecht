import { Router } from "express";
import productManager from "../../data/fs/files/ProductManager.fs.js";

// Products REAL

const productsViewRouter = Router();

productsViewRouter.get('/real', async (__req, res, next) => {
    try {
        const allProducts = await productManager.read();
        return res.render('products', { allProducts });
    } catch(err) {
        return next(err);
    };
});
productsViewRouter.get('/detail/:pid', async(req, res, next) => {
    try {
        const { pid } = req.params;
        const selected = await productManager.readOne(pid);
        return res.render('productDetail', { product: selected });
    } catch(err) {
        return next(err);
    };
});

export default productsViewRouter;