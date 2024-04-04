import fs from "fs";
import crypto from "crypto";

class ProductManager {
    constructor() {
        this.path = './src/data/fs/files/products.json'
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
                    price: data.price || '1',
                    stock: data.stock || '1'
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
    async read(category = null) {
        try {
            let allProducts = await fs.promises.readFile(this.path, 'utf-8');
            allProducts = JSON.parse(allProducts);
            if (category) {
                allProducts = allProducts.filter(each => each.category === category);
            };
            if (allProducts.length === 0) {
                return null;
            };
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
            let selected = allProducts.find(each => each.id === id);
            if (selected) {
                console.log(selected);
                return selected;       
            } else {
                const error = new Error('No product found with the specified ID. Please check the ID and try again.');
                error.statusCode = 404;
                throw error;
            };
        } catch(err) {
            throw err;
        };
    };
    async destroy(id) {
        try {
            let allProducts = await fs.promises.readFile(this.path, 'utf-8');
            allProducts = JSON.parse(allProducts);
            let selected = allProducts.find(each => each.id === id);
            if (selected) {
                let withoutSelected = allProducts.filter(each => each.id !== id);
                withoutSelected = JSON.stringify(withoutSelected, null, 4);
                await fs.promises.writeFile(this.path, withoutSelected);
                console.log('The product has been successfully deleted');
                console.log(selected)
                return selected;
            } else {
                const error = new Error('No product found with the specified ID. Please check the ID and try again.');
                error.statusCode = 404;
                throw error;
            };
        } catch(err) {
            throw err;
        };
    };
    async update(id, data) {
        try {
            let allProducts = await this.read();
            let selected = allProducts.find(each => each.id === id);
            if (selected) {
                for (let prop in data) {
                    selected[prop] = data[prop];
                };
                allProducts = JSON.stringify(allProducts, null, 4);
                await fs.promises.writeFile(this.path, allProducts);
                console.log('The product has been updated successfully');
                console.log(selected);
                return selected;
            } else {
                const error = new Error('No product found with the specified ID. Please check the ID and try again.')
                error.statusCode = 404;
                throw error;
            };
        } catch(err) {
            throw err;
        };
    };
};

const productManager = new ProductManager()
export default productManager


