// config/db.js
const mongoose = require('mongoose');
const config = require('./env');

const connectWithRetry = async () => {

    try {
     
        await mongoose.connect(config.mongoURI || process.env.MONGO_URI, {
        
        });
        console.log('Database connected successfully!');
    } catch (err) {
        console.error(`Failed to connect to MongoDB: ${err}`);
        setTimeout(connectWithRetry, 5000); // Retry connection after 5 seconds
    }
};

module.exports = connectWithRetry;
