import joi from "joi-oid";

const userSchema = joi.object({
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
  firstName: joi
    .string()
    .required()
    .pattern(new RegExp("^[a-zA-Zà-ÿÀ-Ÿ]+([ '-][a-zA-Zà-ÿÀ-Ÿ]+)*$"))
    .min(1)
    .max(50)
    .messages({
      "any.required": "First name is required",
      "string.pattern.base": "First name must contain only letters",
      "string.min": "First name must contain at least 1 characters",
      "string.max": "First name must contain less than 50 characters",
    }),
  lastName: joi
    .string()
    .required()
    .pattern(new RegExp("^[a-zA-Zà-ÿÀ-Ÿ]+([ '-][a-zA-Zà-ÿÀ-Ÿ]+)*$"))
    .min(2)
    .max(50)
    .messages({
      "any.required": "Last name is required",
      "string.pattern.base": "Last name must contain only letters",
      "string.min": "Last name must contain at least 1 characters",
      "string.max": "Last name must contain less than 50 characters",
    }),
  age: joi.number().required().integer().min(12).max(120).messages({
    "any.required": "Age is required",
    "number.base": "Age must be a number",
    "number.integer": "Age must be an integer",
    "number.min": "The minimum age is 12",
    "number.max": "The maximum age is 120",
  }),
  role: joi.number().integer().min(0).max(2).messages({
    "number.base": "Role must be a number",
    "number.integer": "Role must be an integer",
    "number.min": "Role must be from 0 to 2",
    "number.max": "Role must be from 0 to 2",
  }),
  photo: joi.string().uri().messages({
    "string.uri": "Photo must be a valid URL",
  }),
  verified: joi.boolean().messages({
    "boolean.base": "Verified must be a boolean",
  }),
  verificationCode: joi.string().messages({
    "string.base": "Verification code must be a 24-digit hexadecimal code",
  }),
});

export default userSchema;
