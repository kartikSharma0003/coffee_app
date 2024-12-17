const express = require("express");
const multer = require("multer");
const itemUploadController = require("../../controller/admin/upload_coffee");
const image = require("../../controller/get_image");
const authController = require("../../controller/login/admin_login");
const authtoken = require("../../middlewares/auth");



 const router = express.Router();

// create admin
 router.post("/createadmin",authController.createAdmin);

 // login admin 
 router.post("/login",authController.loginAdmin);

 // upload the items like coffee
router.post("/uploadItem", itemUploadController.upload,authtoken.verifyAdmin,itemUploadController.uploadItem);

// get item details 
router.get("/getallitem",authtoken.verifyAdmin,itemUploadController.getItemsDetails);

//delete item 
router.delete("/deleteitem/:id",authtoken.verifyAdmin,itemUploadController.deleteItems);

// get image by id
router.get("/images/:id", image); 

module.exports = router;
