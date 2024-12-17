const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());


const startServer = (port)=>{
    app.listen(port,()=>{
        console.log(`Server is running on port ${port}`);
    });
};

module.exports = {app,startServer}
