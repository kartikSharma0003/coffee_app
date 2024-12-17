function failureHandling(res, statusCode, message,) {
    return res.status(statusCode ?? 404).json({
        status: 0,
        message: message == null ? "Data Not Found" : message,
    });
}

module.exports = failureHandling;
``