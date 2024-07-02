import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = 'users';
const schema = new Schema({
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        index: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    role: { 
        type: Number,
        index: true 
    },
    photo: { 
        type: String
    }
},
{
    timestamps: true
}
);

//PAGINATE
schema.plugin(mongoosePaginate)

const User = model(collection, schema);
export default User;