function errorHandler(error, _req, res, _next) {
  console.log(error);
  return res.json({
    statusCode: error.statusCode || 500,
    message: error.message || "API Error",
  });
}

export default errorHandler;
