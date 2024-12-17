
require('dotenv').config(); 



const config = {
  port: process.env.PORT,         
  mongoURI: process.env.MONGO_URI ,
 adminToken: process.env.ADMINTOKEN,
 userToken:process.env.USERTOKEN
};




module.exports = config;
