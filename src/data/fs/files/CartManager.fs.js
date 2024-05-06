import fs from "fs";

class CartManager {
    constructor() {
        this.path = './src/data/fs/files/carts.json'
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
    }

};

const cartManager = new CartManager();
export default cartManager;


// async read(user_id) {
//     try {
//         if(user_id) {
//             let fullCart = await fs.promises.readFile(this.path, 'utf-8');
//             fullCart = JSON.parse(fullCart);
//             let selected = fullCart.find(each => each.user_id === user_id);
//             if (selected) {
//                 console.log(selected);
//                 return selected;       
//             };
//         };         
//     } catch(err) {
//         throw err;
//     };
// };