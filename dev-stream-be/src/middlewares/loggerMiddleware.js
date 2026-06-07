const loggerMiddleware = (req, res, next) => {
    console.log("Request method: ", req.method);
    console.log("Request url: ", req.originalUrl);
    next();
}

module.exports = loggerMiddleware;