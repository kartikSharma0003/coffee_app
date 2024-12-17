const Image = require("../models/upload_image_model");

async function image(req, res) {
  try {
    const { id } = req.params;

    const image = await Image.findOne({ imageId: id });
    if (!image) {
      return res.status(404).json({ message: "Image not found." });
    }

    res.set("Content-Type", image.contentType);
    res.send(Buffer.from(image.imageBase64, "base64"));
  } catch (error) {
    console.error("Error retrieving image:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
}

module.exports =  image ;
