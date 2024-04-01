import fs from "fs";
import crypto from "crypto";

class ProductManager {
    constructor() {
        this.path = './data/fs/files/products.json'
        this.init()
    };
    init() {
        const exists = fs.existsSync(this.path);
        if (!exists) {
            const initData = JSON.stringify([], null, 4);
            fs.writeFileSync(this.path, initData);
            console.log('File created')
        } else {
            console.log('File located')
        };
    };
    async create(data) {
        try {
            if (!data.title) {
                const error = new Error ('Enter product name');
                throw error;
            } else {
                const product = {
                    id: crypto.randomBytes(12).toString('hex'),
                    title: data.title,
                    photo: data.photo || './assets/imgpath.jpg',
                    category: data.category || 'TBD',
                    price: data.price || 'TBD',
                    stock: data.stock || 'TBD'
                };
                let allProducts = await fs.promises.readFile(this.path, 'utf-8');
                    allProducts = JSON.parse(allProducts);
                    allProducts.push(product);
                    allProducts = JSON.stringify(allProducts, null, 4);
                    await fs.promises.writeFile(this.path, allProducts);
                    console.log('Product successfully added to the system');
                    return product;  
            };
        } catch(err) {
            throw err;
        };
    };
    async read(category = 'accessories') {
        try {
            let allProducts = await fs.promises.readFile(this.path, 'utf-8');
            allProducts = JSON.parse(allProducts);
            allProducts = allProducts.filter((each) => each.category === category)
            if (allProducts.length === 0) {
                return null;
            } 
            console.log(allProducts);
            return allProducts;
        } catch(err) {
            throw err;
        };
    };
    async readOne(id) {
        try {
            let allProducts = await fs.promises.readFile(this.path, 'utf-8');
            allProducts = JSON.parse(allProducts);
            let selected = allProducts.find((each) => each.id === id);
            if (!selected) {
                throw new Error('No product found with the specified ID. Please check the ID and try again.');
            } else {
                console.log(selected)
                return selected;
            }
        } catch(err) {
            throw err;
        };
    };
    async destroy(id) {
        try {
            let allProducts = await fs.promises.readFile(this.path, 'utf-8');
            allProducts = JSON.parse(allProducts);
            let selected = allProducts.find((each) => each.id === id);
            if (!selected) {
                throw new Error('No product found with the specified ID. Please check the ID and try again.');
            } else {
                let withoutSelected = allProducts.filter((each) => each.id !== id);
                withoutSelected = JSON.stringify(withoutSelected, null, 4);
                await fs.promises.writeFile(this.path, withoutSelected);
                console.log('The product has been successfully deleted');
                console.log(withoutSelected);
                return withoutSelected;
            };
        } catch(err) {
            throw err;
        };
    };
};

const productManager = new ProductManager()
export default productManager


//TESTING

// async function test() {
//     try {
//         const products = new ProductManager();
//         products.create({})
//         products.read()
//         products.readOne()
//         products.destroy()
//     } catch(err) {
//         console.log(err)
//     }
// };

//test()


