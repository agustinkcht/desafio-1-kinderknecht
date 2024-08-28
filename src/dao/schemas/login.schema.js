import joi from "joi-oid";

const loginSchema = joi.object({
  email: joi
    .string()
    .required()
    .email({ minDomainSegments: 2 })
    .max(40)
    .messages({
      "any.required": "Please provide an email",
      "string.email": "Please enter a valid email adress",
      "string.max": "Your email must have under 40 characters",
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

export default loginSchema;
