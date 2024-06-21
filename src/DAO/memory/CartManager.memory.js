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
                    id: CartManager.#carts.length === 0
                    ? 1
                    : CartManager.#carts[CartManager.#carts.length-1].id+1,
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
    read() {
        try {
            let allCarts = CartManager.#carts;
            console.log(allCarts);
            return allCarts
        } catch (err) {
            console.log(err.message);
        }
    };
    readOne(user_id) {
        try {
            let allCarts = CartManager.#carts;
            let selected = allCarts.find( each => each.user_id === user_id);
            if (!selected) {
                throw new Error ('No item found in the cart')
            } else {
                console.log(selected)
                return selected;
            };
        } catch(err) {
            console.log(err)
        };
    };
    destroy(id) {
        try {
            let allCarts = CartManager.#carts;
            let withoutSelected = allCarts.filter((each) => each.id !== id);
            if (allCarts.length == withoutSelected.length) {
                throw new Error ('No item found with the specified id.');
            } else {
                CartManager.#carts = withoutSelected;
                console.log('Product deleted')
                console.log(CartManager.#carts)
            };
        } catch(err) {
            console.log(err)
        };
    };
    update(id, data) {
        try {
            let allCarts = CartManager.#carts;
            let selected = allCarts.find(each => each.id === id);
            if (selected) {
                for (let prop in data) {
                    selected[prop] = data[prop];
                };
                CartManager.#carts.push(selected);
                console.log('The item has been updated successfully');
                console.log(selected);
                return selected;
            } else {
                const error = new Error('No item found with the specified ID. Please check the ID and try again.')
                error.statusCode = 404;
                throw error;
            };
        } catch(err) {
            console.log(err);
        };
    };
};

const cartManager = new CartManager()

cartManager.create({
    user_id: '00139129038',
    product_id: 'aabbdhsjdhsj',
    quantity: 3,
    state: 'reserved',
});

cartManager.create({
    user_id: '00139129038',
    product_id: 'kkk555jfjf',
    quantity: 1,
    state: 'reserved',
})

cartManager.create({
    user_id: 'tt7474',
    product_id: 'sssdhu',
    quantity: 1,
    state: 'reserved',
})


// TESTING
// node src/data/memory/CartManager.js

//cartManager.read()
//cartManager.readOne('tt7474')
//cartManager.update(2, {state: 'paid'})
//cartManager.destroy(2)

