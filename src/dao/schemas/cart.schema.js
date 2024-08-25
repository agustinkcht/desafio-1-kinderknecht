import joi from "joi-oid";

const cartSchema = joi.object({
  product_id: joi
    .string()
    .required()
    .pattern(new RegExp("^[0-9a-fA-F]{24}$"))
    .messages({
      "any.required": "Product ID is required",
      "string.pattern.base":
        "Product ID must be a a 24-digit hexadecimal code",
    }),
  quantity: joi.number().min(1).max(999).messages({
    "number.base": "Quantity must be a number",
    "number.min": "The minimum quantity is 1",
    "number.max": "The maximum quantity is 999",
  }),
  state: joi
  .string()
  .pattern(new RegExp("^[a-fA-F]$"))
  .messages({
    "string.base": "State can only contain letters",
    "string.pattern.base": "State can only contain letters and be either reserved, paid or delivered"
  })
});

export default cartSchema;
