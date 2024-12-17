const mongoose = require("mongoose");

const coffeeSchema = new mongoose.Schema(
  {
    imageId: {
      type: String,
      required: true,
    },
    coffeeType: {
      type: String,
      required: true,
      trim: true,
    },
    details: {
      type: String,
      required: true,
    },
    price: {
      large: { type: Number, required: true },
      medium: { type: Number, required: true },
      small: { type: Number, required: true },
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    totalRating: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Coffee", coffeeSchema);
