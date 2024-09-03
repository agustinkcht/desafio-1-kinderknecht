import joi from "joi-oid";

const passwordSchema = joi.object({
  code: joi
    .string()
    .required()
    .pattern(new RegExp("^[0-9a-fA-F]{24}$"))
    .messages({
      "any.required": "Please provide your verification code",
      "string.pattern.base": "Verification code is a 24-digit hexadecimal code",
    }),
  password: joi
    .string()
    .required()
    .pattern(new RegExp("^(?=.*[a-zA-Z])(?=.*[0-9]).*$"))
    .min(8)
    .max(25)
    .messages({
      "any.required": "Please provide a password",
      "string.pattern.base":
        "Password must be alphanumerical. It cannot contain special characters.",
      "string.min": "Password must be at least 8 characters long",
      "string.max": "Password must be less than 25 characters long",
    }),
});

export default passwordSchema;
