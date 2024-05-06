class CartManager {
    static #carts = []
    create(data) {
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
                CartManager.#carts.push(cart);
                console.log('Cart successfully updated')
            };
        } catch(err) {
            throw(err)
        };
    };
    readOne(user_id) {
        try {
            let allCarts = CartManager.#carts;
            let selected = allCarts.find( each => each.user_id === user_id);
            if (!selected) {
                throw new Error ('No product found in the cart')
            } else {
                console.log(selected)
                return selected;
            };
        } catch(err) {
            console.log(err)
        };
    };
};

const carts = new CartManager()

carts.create({
    user_id: '111222333',
    product_id: '444555666',
    quantity: 4,
    state: 'delivered',
});

//const test1 = carts.readOne('111222333');
//console.log(test1)

// for testing:
// node src/data/memory/CartManager.js