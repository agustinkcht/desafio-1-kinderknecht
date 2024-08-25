import { Schema, Types, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "products";
const schema = new Schema(
  {
    supplier_id: {
      type: Types.ObjectId,
      index: true,
      ref: "users",
    },
    title: {
      type: String,
      index: true,
    },
    photo: {
      type: String,
    },
    category: {
      type: String,
      index: true,
    },
    price: {
      type: Number,
    },
    stock: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

//PAGINATE
schema.plugin(mongoosePaginate);

// PRE (popullate)
schema.pre("create", function () {
  this.populate({
    path: "supplier_id",
  });
});
schema.pre("find", function () {
  this.populate({
    path: "supplier_id",
  });
});
schema.pre("paginate", function () {
  this.populate({
    path: "supplier_id",
  });
});
schema.pre("findOne", function () {
  this.populate({
    path: "supplier_id",
  });
});
schema.pre("findOneAndUpdate", function () {
  this.populate({
    path: "supplier_id",
  });
});
schema.pre("findOneAndDelete", function () {
  this.populate({
    path: "supplier_id",
  });
});

const Product = model(collection, schema);
export default Product;
