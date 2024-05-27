import { Router } from "express";
//import cartManager from "../../data/fs/files/CartManager.fs.js";
import cartManager from "../../data/mongo/managers/CartManager.mongo.js";

// importante!
// mongo utiliza cartManager.read({ user_id })
// fs utiliza cartManager.read(user_id)

const cartsRouter = Router();

cartsRouter.get('/', read)
cartsRouter.get('/:iid', readOne); // item id
cartsRouter.post('/', create);
cartsRouter.put('/:iid', update);
cartsRouter.delete('/:iid', destroy);
cartsRouter.delete('/user/:uid', destroyMany)

//functions
async function read (req, res, next) {
    try {
        const filter = {};
        const opts = {};
        if (req.query.limit) {
            opts.limit = req.query.limit;
        };
        if (req.query.page) {
            opts.page = req.query.page;
        };
        if (req.query.user_id) {
            filter.user_id = req.query.user_id;
        };
        const all = await cartManager.paginate({ filter, opts });
        return res.json({
            statusCode: 200,
            response: all.docs,
            paginateInfo: {
                page: all.page,
                totalPages: all.totalPages,
                limit: all.limit,
                prevPage: all.prevPage,
                nextPage: all.nextPage,
                totalDocs: all.totalDocs
            }
        });
    } catch(err) {
        return next(err)
    };
}; // con paginate
async function readOne (req, res, next) {
    try {
        const { iid } = req.params;
        const selected = await cartManager.readOne(iid);
        if (selected) {
            return res.json({ 
                statusCode: 200,
                response: selected,
                success: true
            });
        } else {
            const error = new Error(`No item found in the cart with id ${id}`);
            error.statusCode = 404;
            throw error;
        };
    } catch(err) {
        return next(err);
    };
};
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
async function update (req, res, next) { 
    try {
        const { iid } = req.params;
        const data = req.body;
        const updatedItem = await cartManager.update(iid, data);
        return res.json({
            statusCode: 200,
            message: `Item updated successfully`,
            response: updatedItem
        });    
    } catch(err) {
        return next(err);
    };
}; // podes modificar quantity y state
async function destroy (req, res, next) {
    try {
        const { iid } = req.params;
        const deletedItem = await cartManager.destroy(iid);
        return res.json({
            statusCode: 200,
            message: 'Deleted',
            response: deletedItem
        });
    } catch(err) {
        return next(err);
    };
};
async function destroyMany (req, res, next) {
    try {
        const { uid } = req.params;
        const deletedItems = await cartManager.destroyMany(uid)
        return res.json({
            statusCode: 200,
            message: 'Cart reset. All items deleted.',
            response: deletedItems
        });
    } catch(err) {
        return next(err);
    };
};

export default cartsRouter;