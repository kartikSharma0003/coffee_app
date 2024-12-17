const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const Image = require("../../models/upload_image_model");
const Coffee = require("../../models/uploadCoffee/upload_coffee_details_model");
const { sendFail, sendError, sendSuccess } = require("../../utils");




const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const isValid = allowedTypes.test(file.mimetype);

  if (isValid) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type! Only images are allowed."));
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter,
}).single("image");

// Upload Image
async function uploadItem(req, res) {
  try {
    const { coffeeType, details, price } = req.body;

    if (!coffeeType || !details || !price || !req.file) {
      sendFail(res, 400, "All fields are required, including an image.");

    }

    // Convert image buffer to Base64
    const imageBase64 = req.file.buffer.toString("base64");

    // Create and save image
    const imageId = uuidv4();
    const newImage = new Image({
      imageId,
      imageBase64,
      contentType: req.file.mimetype,
    });
    await newImage.save();


    const parsedPrice = JSON.parse(price);

    const newCoffee = new Coffee({
      imageId,
      coffeeType,
      details,
      price: parsedPrice,
    });

    await newCoffee.save();


    sendSuccess(res, 201, "Details uploaded successfully.", newCoffee)

  } catch (error) {

   
    sendError(res, error)

  }
}


async function getItemsDetails(req, res) {

  try {

    var data = await Coffee.find();
    if (data == null || data.length ==0) {
      sendFail(res, 404, "No Data Found");
    }

    sendSuccess(res, 200, "Details Fetch successfully.", data)

  } catch (error) {
    sendError(res, error)
  }

}

async function deleteItems(req, res) {
  try {
    const { id } = req.params;  

    console.log(`Delete item with ID: ${id}`);  


    if (!id) {
      return sendFail(res, 400, "ID is required to delete an item.");
    }


    const coffee = await Coffee.findById(id);

    if (!coffee) {
      return sendFail(res, 404, "Item not found.");
    }

   
    await Image.deleteOne({ imageId: coffee.imageId });

    await Coffee.findByIdAndDelete(id);

    return sendSuccess(res, 200, "Item deleted successfully.",coffee);
  } catch (error) {
    console.error("Error deleting item:", error);
    return sendError(res, error);
  }
}




module.exports = { uploadItem, upload, getItemsDetails,deleteItems };
