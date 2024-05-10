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
        type: String, 
        default: 'https://i.pinimg.com/originals/1c/18/78/1c1878a8b006593b5a6a84e3f85df24a.png' 
    },
    category: { 
        type: String, 
        default: 'TBD', 
        index: true 
    },
    price: { 
        type: Number, 
        default: '1' 
    },
    stock: { 
        type: Number, 
        default: '1' 
    }
},
{
    timestamps: true
});

//PAGINATE
schema.plugin(mongoosePaginate);

const Product = model(collection, schema);
export default Product;

