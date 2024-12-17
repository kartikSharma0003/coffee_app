const image = require("../../controller/get_image");
const authController = require("../../controller/login/user_login");
const authtoken = require("../../middlewares/auth");
const express = require("express");
const itemController = require("../../controller/user/get_items_details");




 const router = express.Router();

 router.post("/createAccount",authController.createUser);

 router.post("/login",authController.loginUser);

 router.get("/getitem",authtoken.verifyUser,itemController.getItemsDetails)

 // get image by id
router.get("/images/:id", image); 




module.exports = router;