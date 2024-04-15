import { Router } from "express";
import productManager from "../../data/fs/files/ProductManager.fs.js";

const productsRouter = Router();

//routes
productsRouter.get('/', read);
productsRouter.get('/:pid', readOne);
productsRouter.post('/', create);
productsRouter.put('/:pid', update);
productsRouter.delete('/:pid', destroy);
// asigno los distintos métodos con sus respectivos endpoints, y la callback que llaman

//functions
async function read (req, res, next) {
    try {
        const { category } = req.query;
        const allProducts = await productManager.read(category);
        if (allProducts) {
            return res.json({
                statusCode: 200,
                response: allProducts,
                category,
                success: true
            });
        } else {
            const error = new Error("Error fetching data");
            error.status = 404;
            throw error;
        };
    } catch(err){
        return next(err);
    };
};

async function readOne (req, res, next) {
    try {
        const { pid } = req.params;
        const selected = await productManager.readOne(pid);
        if (selected) {
            return res.json({
                statusCode: 200,
                response: selected,
                success: true
            });
        } else {
            const error = new Error('Error fetching data');
            error.statuscode = 404;
            throw error;
        };
    } catch(err) {
        return next(err);
    };
};

async function create (req, res, next) {
    try {
        const data = req.body;
        const newProduct = await productManager.create(data)
        return res.json({
            statusCode: 201,
            message: `Product created successfully with id ${newProduct.id}`,
            response: newProduct
        });
    } catch(err) {
        return next(err);
    };
};

async function update (req, res, next) {
    try {
        const { pid } = req.params;
        const data = req.body;
        const updatedProduct = await productManager.update(pid, data);
        return res.json({
            statusCode: 200,
            message: `Product with id ${pid} updated successfully`,
            response: updatedProduct
        });    
    } catch(err) {
        return next(err);
    };
};

async function destroy (req, res, next) {
    try {
        const { pid } = req.params;
        const deletedProduct = await productManager.destroy(pid);
        return res.json({
            statusCode: 200,
            message: 'Product deleted successfully',
            response: deletedProduct
        });
    } catch(err) {
        return next(err);
    };
};

export default productsRouter;

