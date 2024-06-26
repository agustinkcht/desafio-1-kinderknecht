import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = 'products';
const schema = new Schema({
    title: { 
        type: String, 
        required: true, 
        index: true 
    },
    photo: { 
        type: String
    },
    category: { 
        type: String,
        index: true 
    },
    price: { 
        type: Number
    },
    stock: { 
        type: Number
    }
},
{
    timestamps: true
});

//PAGINATE
schema.plugin(mongoosePaginate);

const Product = model(collection, schema);
export default Product;

