function notFoundHandler (req, res, _next) {
    return res.json({
        statusCode: 404,
        message: `${req.method} ${req.url} path not found`
    });
};

export default notFoundHandler;