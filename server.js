import express from "express";
import userManager from "./data/fs/files/UserManager.fs.js";
import productManager from "./data/fs/files/ProductManager.fs.js";

// server init
const server = express();
const port = 8080;
const handleServerStart = () => {
    console.log(`Server is now running on port ${port}`)
};
server.listen(port, handleServerStart);

//middlewares
server.use(express.urlencoded({ extended: true }))

//router
server.get('/', async(req, res) => {
    try{
        return res.status(200).json({
            response: 'Home',
            success: true
        });
    } catch(err) {
        console.log(err);
        return res.status(500).json({
            response: 'Error reaching server',
            success: false
        });
    };
});


//PRODUCTS
server.get('/api/products', async(req, res) => {
    try {
        const { category } = req.query;
        const allProducts = await productManager.read(category);
        if (allProducts) {
            return res.status(200).json({
                response: allProducts,
                success: true
            });
        } else {
            const error = new Error('Unable to reach the products');
            throw error;
        };
    } catch(err) {
        console.log(err);
        return res.status(404).json({
            response: null,
            message: err.message,
            success: false
        });
    };
});

server.get('/api/products/:pid', async(req, res) => {
    try {
        const { pid } = req.params;
        const selected = await productManager.readOne(pid);
        if (selected) {
            return res.status(200).json({
                response: selected,
                success: true
            });
        } else {
            const error = new Error('No product found with the specified ID. Please check the ID and try again.');
            throw error;
        };
    } catch(err) {
        console.log(err);
        return res.status(404).json({
            response: null,
            message: err.message,
            success: false
        });
    };
});



//USERS
server.get('/api/users', async(req, res) => {
    try {
        const { role } = req.query;
        const allUsers = await userManager.read(role);
        if (allUsers) {
            return res.status(200).json({
                response: allUsers,
                success: true
            });
        } else {
            const error = new Error('Unable to reach the users');
            throw error;
        };
    } catch(err) {
        console.log(err);
        return res.status(404).json({
            response: null,
            message: err.message,
            success: false
        });
    };
});

server.get('/api/users/:uid', async(req, res) => {
    try {
        const { uid } = req.params;
        const selected = await userManager.readOne(uid);
        if (selected) {
            return res.status(200).json({
                response: selected,
                success: true
            });
        } else {
            const error = new Error('No user found with the specified ID. Please check the ID and try again.');
            throw error;
        };
    } catch(err) {
        console.log(err);
        return res.status(404).json({
            response: null,
            message: err.message,
            success: false
        });
    };
});






