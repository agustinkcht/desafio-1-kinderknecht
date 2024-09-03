import joi from "joi-oid";

const productSchema = joi.object({
  title: joi.string().required().min(1).max(100).messages({
    "any.required": "Title is required",
    "string.min": "Title must contain at least 1 characters",
    "string.max": "Title must contain less than 100 characters",
  }),
  photo: joi.string().uri().messages({
    "string.uri": "Photo must be a valid URL",
  }),
  category: joi.string().max(50).messages({
    "string.min": "Category must contain between 1 and 50 characters",
    "string.max": "Category must contain less than 50 characters",
  }),
  price: joi.number().min(0).max(9999999).messages({
    "number.base": "Price must be a number",
    "number.min": "The minimum price is 0",
    "number.max": "The maximum price is 9999999",
  }),
  stock: joi.number().min(1).max(9999999).messages({
    "number.base": "Stock must be a number",
    "number.min": "The minimum stock is 1",
    "number.max": "The maximum stock is 999999",
  }),
});

export default productSchema;
