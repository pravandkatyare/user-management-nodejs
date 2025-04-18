const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;

    // Set the response status code
    res.status(statusCode);

    // Send the error response
    res.json({
        message: err.message,
        stack: err.stack,
    });
}

module.exports = errorHandler;
// This middleware function handles errors in the application. It takes four parameters: err, req, res, and next.