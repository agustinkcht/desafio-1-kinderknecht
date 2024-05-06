import { Schema, model } from "mongoose";

const collection = 'products';

const schema = new Schema({
    title: { type: String, required: true },
    photo: { type: String, default: './assets/imgpath.jpg' },
    category: { type: String, default: 'TBD' },
    price: { type: Number, default: '1' },
    stock: { type: Number, default: '1' }
},
{
    timestamps: true
});

const Product = model(collection, schema);

export default Product;

// title obligatorio, photo (ruta de img por defecto), category (valor x defecto), price (x defecto 1), stock (x defecto 1)