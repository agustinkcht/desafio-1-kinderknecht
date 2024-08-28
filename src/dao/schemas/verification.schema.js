import joi from "joi-oid";

const verificationSchema = joi.object({
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
    code: joi
    .string()
    .required()
    .pattern(new RegExp("^[0-9a-fA-F]{24}$"))
    .messages({
        "any.required": "Please provide your verification code",
        "string.pattern.base": "Verification code is a 24-digit hexadecimal code"
    })
})

export default verificationSchema;