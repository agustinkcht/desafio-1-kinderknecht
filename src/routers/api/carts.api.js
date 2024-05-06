import { Router } from "express";
//import cartManager from "../../data/fs/files/CartManager.fs.js";
import cartManager from "../../data/mongo/managers/CartManager.mongo.js";

// importante!
// mongo utiliza cartManager.read({ user_id })
// fs utiliza cartManager.read(user_id)

const cartsRouter = Router();

cartsRouter.post('/', create);
cartsRouter.get('/', read);

async function create (req, res, next) {
    try {
        const data = req.body;
        const one = await cartManager.create(data);
        return res.json({
            statusCode: 201,
            message: 'Created',
            response: one
        }); 
    } catch(err) {
        return next(err)
    };
};
async function read (req, res, next) {
    try {
        const { user_id } = req.query;
        if (user_id) {
            const cart = await cartManager.read({ user_id });
            if (cart) {
                return res.json({
                    statusCode: 200,
                    message: 'Read',
                    response: cart
                });
            };
        } else {
            const error = new Error('No cart available');
            error.statusCode = 404;
            throw error;
        };
    } catch(err){
        return next(err);
    };
};

export default cartsRouter;