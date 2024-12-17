const { sendFail, sendError, sendSuccess } = require("../utils");
const {config} = require("../config")
const jwt = require('jsonwebtoken');

exports.verifyAdmin = (req, res, next) => {
    try {

        const authHeader = req.headers["authorization"];

        if (!authHeader || !authHeader.startsWith('Bearer ')) {

            sendFail(res, 401, "Access denied. No token provided.")

        }


        const token = authHeader.split(' ')[1];
        const userData =   jwt.verify(token,config.adminToken );
        req.user = userData; 
        next();

    } catch (error) { 

        if (error.name === 'JsonWebTokenError') {
            sendFail(res,400,"Invalid token.")
          
        }
        if (error.name === 'TokenExpiredError') {
            sendFail(res,401,"Token has expired.")
          
        }
        return next(error);
    }
}


exports.verifyUser = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ status: 0, message: 'Access denied. No token provided.' });
        }

       
        const token = authHeader.split(" ")[1];

       

     
        const userData = jwt.verify(token, config.userToken);

       
      

        // Attach user data to the request object
        req.user = userData;
        next();

    } catch (error) {
        // Handle token verification errors
        if (error.name === 'JsonWebTokenError') {
            return sendFail(res, 400, "Invalid token.");
        }
        if (error.name === 'TokenExpiredError') {
            return sendFail(res, 401, "Token has expired.");
        }

        // Handle any unexpected errors
        return sendError(res, error);
    }
};
