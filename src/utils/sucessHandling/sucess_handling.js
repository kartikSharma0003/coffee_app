
function sendSuccess(res, statusCode, message, data = null) {
    const response = {
        status: 1,
        message: message,
        "data": data
    };

  
    return res.status(statusCode).json(response);
}

module.exports = sendSuccess;
