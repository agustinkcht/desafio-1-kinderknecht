import logger from "../utils/winston.util.js";
// take the logger from the winston util. it has all the config to create a log and manifest 
// it according to the data that's passing through it.

function errorHandler(error, req, res, _next) {
  const statusCode = error.statusCode;
  const message = error.message;
  const errorMessage = `${statusCode} - ${req.method} ${
    req.url
  } - ${message} - ${new Date().toLocaleTimeString()} `; // crafting message
  logger.ERROR(errorMessage); 
  return res.json({
    statusCode: statusCode || 500,
    message: message || "API Error",
  });
}

export default errorHandler;

