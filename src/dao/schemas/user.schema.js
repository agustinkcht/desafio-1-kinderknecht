import joi from "joi-oid";

const userSchema = joi.object({
  email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', "net"] } }).required().messages({
    "string.email": "Please provide a valid email"
  }),
  password: joi.string().required().alphanum().min(8).max(25).messages({
    "any.required": "Please provide a password",
    "string.empty": "Please provide a password",
    "string.aplhanum": "Password must be alphanumeric",
    "string.min": "Password must be at least 8 characters long",
    "string.max": "Password must be less than 25 characters long"
  }),
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  age: joi.number(),
  role: joi.number(),
  photo: joi.string().uri().messages({
    "string.uri": "Photo must be an URL"
  }),
  verified: joi.boolean(),
  verificationCode: joi.string(),
});

export default userSchema;
