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
        type: String, 
        default: '1', 
        index: true 
    },
    photo: { 
        type: String, 
        default: 'https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png' 
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