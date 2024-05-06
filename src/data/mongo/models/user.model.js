import { Schema, model } from "mongoose";

const collection = 'users';

const schema = new Schema({
    photo: { type: String, default: './assets/imgpath.jpg' },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: '1' }
},
{
    timestamps: true
}
);

const User = model(collection, schema);

export default User;