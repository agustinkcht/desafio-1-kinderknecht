class ProductManager {
    static #products = []
    create(data){
        try {
            if (!data.title) {
                const error = new Error ('Enter product name');
                throw error;
            } else {
                const product = {
                    id: ProductManager.#products.length === 0
                    ? 1
                    : ProductManager.#products[ProductManager.#products.length-1].id+1,
                    photo: data.photo || 'https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png',
                    category: data.category || 'TBD',
                    price: data.price || 'TBD',
                    stock: data.stock || 'TBD'
                }
                ProductManager.#products.push(product);
                console.log('Product successfully created')
            };
        } catch(err) {
            throw(err)        
        };
    };
    read() {
        try {
            return ProductManager.#products;
        } catch(err) {
            console.log('Unable to reach the products')
        };
    };
    readOne(id) {
        try {
            let allProducts = ProductManager.#products;
            let selected = allProducts.find((each) => each.id === id);
            if (!selected) {
                throw new Error ('No product found with the specified ID. Please check the ID and try again.');
            } else {
                console.log(selected)
            };      
        } catch(err) {
            console.log(err)
        };
    };
    destroy(id) {
        try {
            let allProducts = ProductManager.#products;
            let withoutSelected = allProducts.filter((each) => each.id !== id);
            if (allProducts.length == withoutSelected.length) {
                throw new Error ('No product found with the specified ID. Please check the ID and try again.');
            } else {
                ProductManager.#products = withoutSelected;
                console.log('Product deleted')
                console.log(ProductManager.#products)
            };
        } catch(err) {
            console.log(err)
        };
    };
    update(id, data) {
        try {
            let allProducts = ProductManager.#products;
            let selected = allProducts.find(each => each.id === id);
            if (selected) {
                for (let prop in data) {
                    selected[prop] = data[prop];
                };
                ProductManager.#products.push(selected);
                console.log('The product has been updated successfully');
                console.log(selected);
                return selected;
            } else {
                const error = new Error('No product found with the specified ID. Please check the ID and try again.')
                error.statusCode = 404;
                throw error;
            };
        } catch(err) {
            console.log(err);
        };
    };
};

const products = new ProductManager()

products.create({
    title: 'Airpods Pro 2',
    photo: 'https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png',
    category: 'accessories',
    price: 249,
    stock: 40
});

products.create({
    title: 'Apple EarPods',
    photo: 'https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png',
    category: 'accessories',
    price: 89,
    stock: 40
});

products.create({
    title: 'Airpods Max',
    photo: 'https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png',
    category: 'accessories',
    price: 549,
    stock: 40
});

products.create({
    title: 'Airpods 3rd gen',
    photo: 'https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png',
    category: 'accessories',
    price: 169,
    stock: 40
});

products.create({
    title: 'iPhone 15 Pro',
    photo: 'https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png',
    category: 'phones',
    price: 999,
    stock: 30
});

products.create({
    title: 'iPhone 14',
    photo: 'https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png',
    category: 'phones',
    price: 699,
    stock: 30
});

products.create({
    title: 'Apple Watch 9',
    photo: 'https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png',
    category: 'watches',
    price: 399,
    stock: 35
});

products.create({
    title: 'MacBook Air 13 M2',
    photo: 'https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png',
    category: 'laptops',
    price: 999,
    stock: 20
});

products.create({
    title: 'MacBook Pro 14 M3',
    photo: 'https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png',
    category: 'laptops',
    price: 1599,
    stock: 20
});

products.create({
    title: 'Mac Studio M2 Max',
    photo: 'https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png',
    category: 'computers',
    price: 1999,
    stock: 20
});

products.create({
    title: 'iPhone SE Plus',
    photo: 'https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png',
    category: 'phones',
    price: 499,
    stock: 30
});

products.create({
    title: 'iPhone XR2',
    photo: 'https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png',
    category: 'phones',
    price: 599,
    stock: 30
});

products.create({
    title: 'iPhone 11',
    photo: 'https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png',
    category: 'phones',
    price: 599,
    stock: 30
});

products.create({
    title: 'iPhone XS',
    photo: 'https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png',
    category: 'phones',
    price: 899,
    stock: 30
});

products.create({
    title: 'iPhone 8',
    photo: 'https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png',
    category: 'phones',
    price: 499,
    stock: 30
});

products.create({
    title: 'iPhone 7 Plus',
    photo: 'https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png',
    category: 'phones',
    price: 549,
    stock: 30
});

products.create({
    title: 'AirPods Pro Lite',
    photo: 'https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png',
    category: 'accessories',
    price: 199,
    stock: 40
});

products.create({
    title: 'AirTag Keychain',
    photo: 'https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png',
    category: 'accessories',
    price: 29,
    stock: 40
});

products.create({
    title: 'AirTag Leather Loop',
    photo: 'https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png',
    category: 'accessories',
    price: 39,
    stock: 40
});

products.create({
    title: 'Apple Watch Series 8',
    photo: 'https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png',
    category: 'accessories',
    price: 449,
    stock: 35
});

products.create({
    title: 'Apple Watch Sport Loop Band',
    photo: 'https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png',
    category: 'accessories',
    price: 49,
    stock: 35
});

products.create({
    title: 'Apple Watch Milanese Loop Band',
    photo: 'https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png',
    category: 'accessories',
    price: 99,
    stock: 35
});

products.create({
    title: 'MacBook Pro 16 M4',
    photo: 'https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png',
    category: 'laptops',
    price: 2499,
    stock: 20
});

products.create({
    title: 'MacBook Air 14 M2',
    photo: 'https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png',
    category: 'laptops',
    price: 1199,
    stock: 20
});

products.create({
    title: 'iMac Pro 32-inch',
    photo: 'https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png',
    category: 'computers',
    price: 3499,
    stock: 20
});

products.create({
    title: 'Mac Mini Pro',
    photo: 'https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png',
    category: 'computers',
    price: 1499,
    stock: 20
});

products.create({
    title: 'Anker PowerPort Atom III',
    photo: 'https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png',
    category: 'chargers',
    price: 39,
    stock: 50
});

products.create({
    title: 'RAVPower 30W 2-Port Wall Charger',
    photo: 'https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png',
    category: 'chargers',
    price: 19,
    stock: 50
});

products.create({
    title: 'Belkin Boost Charge 27W USB-C Wall Charger',
    photo: 'https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png',
    category: 'chargers',
    price: 29,
    stock: 50
});

products.create({
    title: 'AmazonBasics Nylon Braided Lightning to USB-A Cable',
    photo: 'https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png',
    category: 'cables',
    price: 12,
    stock: 50
});

products.create({
    title: 'UGREEN USB-C to 3.5mm Headphone Jack Adapter',
    photo: 'https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png',
    category: 'cables',
    price: 9,
    stock: 50
});

products.create({
    title: 'Anker Soundcore Life Q20 Hybrid Active Noise Cancelling Headphones',
    photo: 'https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png',
    category: 'headphones',
    price: 59,
    stock: 50
});

products.create({
    title: 'Sony WH-1000XM4 Wireless Noise Cancelling Headphones',
    photo: 'https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png',
    category: 'headphones',
    price: 279,
    stock: 50
});

products.create({
    title: 'Bose QuietComfort 45 Wireless Headphones',
    photo: 'https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png',
    category: 'headphones',
    price: 329,
    stock: 50
});

products.create({
    title: 'JBL Tune 750BTNC Wireless Over-Ear Headphones',
    photo: 'https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png',
    category: 'headphones',
    price: 129,
    stock: 50
});

products.create({
    title: 'Sennheiser HD 450BT Wireless Noise Cancelling Headphones',
    photo: 'https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png',
    category: 'headphones',
    price: 199,
    stock: 50
});

products.create({
    title: 'Samsung Fast Charge Wireless Charging Stand',
    photo: 'https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png',
    category: 'chargers',
    price: 49,
    stock: 50
});

products.create({
    title: 'Mophie Dual Wireless Charging Pad',
    photo: 'https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png',
    category: 'chargers',
    price: 69,
    stock: 50
});

products.create({
    title: 'Roku Wireless Charging Pad',
    photo: 'https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png',
    category: 'chargers',
    price: 29,
    stock: 50
});

products.create({
    title: 'Belkin USB-C to USB-A Cable',
    photo: 'https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png',
    category: 'cables',
    price: 10,
    stock: 50
});


//TESTING
// node src/data/memory/ProductManager.js

//products.read()
//products.readOne('')
//products.update(1, {price: 5})
//products.destroy(1)
