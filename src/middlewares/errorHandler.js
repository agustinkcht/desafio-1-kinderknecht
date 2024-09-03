import logger from "../utils/winston.util.js";
// take the logger from the winston util. it has all the config to create a log and manifest 
// it according to the data that's passing through it.

function errorHandler(error, req, res, _next) {
  const statusCode = error.statusCode
  const errorMessage = `${statusCode} - ${req.method} ${
    req.url
  } - ${error.message} - ${new Date().toLocaleTimeString()} `; // crafting message
  // checking status for sending ERROR level or FATAL.
  statusCode < 500 ? logger.ERROR(errorMessage) : logger.FATAL(errorMessage);
  return res.json({
    statusCode: statusCode || 500,
    message: error.message || "Fatal",
  });
}

export default errorHandler;

