import fs from "fs";
import crypto from "crypto";

class CartManager {
    constructor() {
        this.path = './src/dao/fs/files/carts.json'
        this.init();
    };
    init() {
        const exists = fs.existsSync(this.path);
        if (!exists) {
            const initData = JSON.stringify([], null, 4);
            fs.writeFileSync(this.path, initData);
            console.log('File created');
        } else {
            console.log('File located');
        };
    };
    async create(data) {
        try {
            if (!data.user_id) {
                const error = new Error ('User ID required');
                throw error;
            } else if (!data.product_id) {
                const error = new Error ('Product ID required');
                throw error;
            } else if (!data.quantity) {
                const error = new Error ('Quantity required');
                throw error;
            } else {
                const cart = {
                    id: crypto.randomBytes(12).toString('hex'),
                    user_id: data.user_id,
                    product_id: data.product_id,
                    quantity: data.quantity,
                    state: data.state || 'reserved'
                };
                let allCarts = await fs.promises.readFile(this.path, 'utf-8');
                    allCarts = JSON.parse(allCarts);
                    allCarts.push(cart);
                    allCarts = JSON.stringify(allCarts, null, 4);
                    await fs.promises.writeFile(this.path, allCarts);
                    console.log('Product added to the cart');
                    return cart;  
            };
        } catch(err) {
            throw err;
        };
    };
    async read(user_id) {
        if(!user_id) {
            const error = new Error ('Enter user ID')
            throw error;
        };
        try {
            let allCarts = await fs.promises.readFile(this.path, 'utf-8');
            allCarts = JSON.parse(allCarts);
            let cart = allCarts.filter(each => each.user_id === user_id);
            if (cart) {
                console.log(cart);
                return cart;
            } else {
                const error = new Error (`There are no products in the cart of user: ${user_id}`)
                throw error;
            };
        } catch(err) {
            throw err;
        }
    };
    async readOne(id) {
        try {
            let allCarts = await fs.promises.readFile(this.path, 'utf-8');
            allCarts = JSON.parse(allCarts);
            let selected = allCarts.find(each => each.id === id);
            if (selected) {
                console.log(selected);
                return selected;       
            } else {
                const error = new Error(`No item found in the cart with id ${id}`);
                error.statusCode = 404;
                throw error;
            };
        } catch(err) {
            throw err;
        };
    };
    async destroy(id) {
        try {
            let allCarts = await fs.promises.readFile(this.path, 'utf-8');
            allCarts = JSON.parse(allCarts);
            let selected = allCarts.find(each => each.id === id);
            if (selected) {
                let withoutSelected = allCarts.filter(each => each.id !== id);
                withoutSelected = JSON.stringify(withoutSelected, null, 4);
                await fs.promises.writeFile(this.path, withoutSelected);
                console.log('The item has been successfully deleted');
                console.log(selected)
                return selected;
            } else {
                const error = new Error(`No item found in the cart with id ${id}`);
                error.statusCode = 404;
                throw error;
            };
        } catch(err) {
            throw err;
        };
    };
    async update(id, data) {
        try {
            let allCarts = await fs.promises.readFile(this.path, 'utf-8');
            allCarts = JSON.parse(allCarts);
            let selected = allCarts.find(each => each.id === id);
            if (selected) {
                for (let prop in data) {
                    selected[prop] = data[prop];
                };
                allCarts = JSON.stringify(allCarts, null, 4);
                await fs.promises.writeFile(this.path, allCarts);
                console.log('The item has been updated successfully');
                console.log(selected);
                return selected;
            } else {
                const error = new Error(`No item found in the cart with id ${id}`)
                error.statusCode = 404;
                throw error;
            };
        } catch(err) {
            throw err;
        };
    };

};

const cartManager = new CartManager();
export default cartManager;