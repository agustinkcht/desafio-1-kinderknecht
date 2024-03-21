class ProductManager {
    static #products = []
    create(data){
        const product = {
            id: ProductManager.#products.length === 0
                ? 1
                : ProductManager.#products[ProductManager.#products.length-1].id+1,
            title: data.title,
            photo: data.photo,
            category: data.category,
            price: data.price,
            stock: data.stock
        }
        ProductManager.#products.push(product);
        console.log('Producto Creado')
    }
    read(){
        return ProductManager.#products
    }
}

const products = new ProductManager()

products.create({
    title: 'airpods pro 2nd gen',
    photo: 'airpods-pro.jpg',
    category: 'accessories',
    price: 249,
    stock: 11
})

products.create({
    title: 'tempered glass',
    photo: 'temperedglass.jpg',
    category: 'phone protection',
    price: 12,
    stock: 100
})

products.create({
    title: 'apple watch',
    photo: 'applewatch.jpg',
    category: 'accessories',
    price: 490,
    stock: 24
})

products.create({
    title: 'magic mouse 2',
    photo: 'magicmouse.jpg',
    category: 'accessories',
    price: 149,
    stock: 26
})

products.create({
    title: 'mac mini',
    photo: 'macmini.jpg',
    category: 'computers',
    price: 700,
    stock: 14
})

console.log(products.read())