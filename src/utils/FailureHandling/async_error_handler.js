// utils/errorHandler.js
function sendError(res, error) {
    console.error(`Error: ${error.message}`);

    if (error.name === 'MongoNetworkError') {
        return res.status(503).json({
            status: 0,
            message: "Database connection error"
        });
    }

    if (error.name === 'ValidationError') {
        return res.status(400).json({
            status: 0,
            message: "Validation error: " + error.message
        });
    }

    if (error.name === 'CastError') {
        return res.status(400).json({
            status: 0,
            message: "Invalid data format: " + error.message
        });
    }

    // Handle other types of errors (generic)
    return res.status(500).json({
        status: 0,
        message: "Server Error"
    });
}

module.exports = sendError;
