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
                    photo: data.photo || './assets/imgpath.jpg',
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
};

const products = new ProductManager()

products.create({
    title: 'Airpods Pro 2',
    photo: './assets/imgpath.jpg',
    category: 'accessories',
    price: 249,
    stock: 40
})

products.create({
    title: 'Apple Earpods',
    photo: './assets/imgpath.jpg',
    category: 'accessories',
    price: 89,
    stock: 40
})

products.create({
    title: 'Airpods Max',
    photo: './assets/imgpath.jpg',
    category: 'accessories',
    price: 549,
    stock: 40
})

products.create({
    title: 'Airpods 3rd gen',
    photo: './assets/imgpath.jpg',
    category: 'accessories',
    price: 169,
    stock: 40
})

products.create({
    title: 'iPhone 15 Pro',
    photo: './assets/imgpath.jpg',
    category: 'phones',
    price: 999,
    stock: 30
})

products.create({
    title: 'iPhone 14',
    photo: './assets/imgpath.jpg',
    category: 'phones',
    price: 699,
    stock: 30
})

products.create({
    title: 'Apple Watch 9',
    photo: './assets/imgpath.jpg',
    category: 'watches',
    price: 399,
    stock: 35
})

products.create({
    title: 'Macbook Air 13 M2',
    photo: './assets/imgpath.jpg',
    category: 'laptops',
    price: 999,
    stock: 20
})

products.create({
    title: 'Macbook Pro 14 M3',
    photo: './assets/imgpath.jpg',
    category: 'laptops',
    price: 1599,
    stock: 20
})

products.create({
    title: 'Mac Studio M2 Max',
    photo: './assets/imgpath.jpg',
    category: 'computers',
    price: 1999,
    stock: 20
})


//TESTING

products.read()
//products.readOne(8)
//products.destroy()






