import { Schema, model, Types } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = 'carts';
const schema = new Schema(
    {
        user_id: {
            type: Types.ObjectId,
            required: true,
            index: true,
            ref: 'users'
        },
        product_id: { 
            type: Types.ObjectId, 
            required: true,
            index: true,
            ref: 'products'
        },
        quantity: { 
            type: Number, 
            required: true
        },
        state: {
            type: String,
            enum: ['reserved', 'paid', 'delivered']
        }
    },
    {
        timestamps: true,
    }
);

// PAGINATE
schema.plugin(mongoosePaginate); 

// MIDDLEWARES PRE para POPULATE
schema.pre('find', function() {
    this.populate({
        path: 'user_id',
        //select: 'email photo -_id'
    });
});
schema.pre('find', function() {
    this.populate({
        path: 'product_id',
        //select: 'title photo category price -_id'
    });
});
schema.pre('findOne', function() {
    this.populate({
        path: 'user_id',
        //select: 'email photo -_id'
    });
});
schema.pre('findOne', function() {
    this.populate({
        path: 'product_id',
        //select: 'title photo category price -_id'
    });
});
schema.pre('findOneAndUpdate', function() {
    this.populate({
        path: 'user_id',
        //select: 'email photo -_id'
    });
});
schema.pre('findOneAndUpdate', function() {
    this.populate({
        path: 'product_id',
        //select: 'title photo category price -_id'
    });
});
schema.pre('findOneAndDelete', function() {
    this.populate({
        path: 'user_id',
        //select: 'email photo -_id'
    });
});
schema.pre('findOneAndDelete', function() {
    this.populate({
        path: 'product_id',
        //select: 'title photo category price -_id'
    });
});

const Cart = model(collection, schema);

export default Cart;