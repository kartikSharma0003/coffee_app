const express = require("express");
const {db,config} = require("./config");
require('dotenv').config();
const cors = require("cors");

const adminroutes = require("./routes/adminRoutes/routes");
const userroutes = require("./routes/userRoute/routes");

function startServer() {
  const app = express();

  // Middleware
  app.use(express.json());
  app.use(cors());

  const PORT = config.port || 3000; // Default to 3000 if port is undefined

  db()
    .then(() => {
      

      // Basic route
      app.get("/", (req, res) => {
        console.log("Log: Home route accessed");
        res.send("Working");
      });

      // Start server
      app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
      });


      app.use("/user",userroutes);

      app.use("/admin", adminroutes);
    })
    .catch((err) => {
      console.error("Failed to connect to the database", err);
      process.exit(1); // Exit the process if DB connection fails
    });
}
startServer()
module.exports = startServer;
