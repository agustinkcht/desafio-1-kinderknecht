import { Schema, model, Types } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "carts";
const schema = new Schema(
  {
    user_id: {
      type: Types.ObjectId,
      required: true,
      index: true,
      ref: "users",
    },
    product_id: {
      type: Types.ObjectId,
      required: true,
      index: true,
      ref: "products",
    },
    quantity: {
      type: Number,
      required: true,
    },
    state: {
      type: String,
      enum: ["reserved", "paid", "delivered"],
    },
  },
  {
    timestamps: true,
  }
);

// PAGINATE
schema.plugin(mongoosePaginate);

// MIDDLEWARES PRE para POPULATE
schema.pre("create", function () {
  this.populate({
    path: "user_id",
  });
});
schema.pre("create", function () {
  this.populate({
    path: "product_id",
  });
});
schema.pre("find", function () {
  this.populate({
    path: "user_id",
  });
});
schema.pre("find", function () {
  this.populate({
    path: "product_id",
  });
});
schema.pre("findOne", function () {
  this.populate({
    path: "user_id",
  });
});
schema.pre("findOne", function () {
  this.populate({
    path: "product_id",
  });
});
schema.pre("findOneAndUpdate", function () {
  this.populate({
    path: "user_id",
  });
});
schema.pre("findOneAndUpdate", function () {
  this.populate({
    path: "product_id",
  });
});
schema.pre("findOneAndDelete", function () {
  this.populate({
    path: "user_id",
  });
});
schema.pre("findOneAndDelete", function () {
  this.populate({
    path: "product_id",
  });
});

const Cart = model(collection, schema);

export default Cart;
