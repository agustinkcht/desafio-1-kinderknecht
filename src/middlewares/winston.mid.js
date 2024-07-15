import logger from "../utils/winston.util.js";

function winston(req, __res, next) {
  try {
    req.logger = logger;
    const message = `${req.method} ${req.url} - ${
        new Date().toLocaleTimeString()
    }`; // craft the message structure for the logs
    req.logger.HTTP(message);
    return next()
  } catch (err) {
    return next(err);
  }
}

export default winston;

