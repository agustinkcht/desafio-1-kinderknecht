import CustomError from "../utils/errors/CustomError.js";

function validator(schema) {
  return (req, _res, next) => {
    const validation = schema.validate(req.body, { abortEarly: false });
    console.log(validation.error);
    if (validation.error) {
      const message = validation.error.details.map((error) => error.message);
      CustomError.new({ message, statusCode: 400 });
    }
    return next();
  };
}

export default validator;

