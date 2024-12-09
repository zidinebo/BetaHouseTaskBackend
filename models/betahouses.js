const mongoose = require("mongoose");

const houseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, // e.g., "Real House Luxury Villa"
    location: { type: String, required: true }, // e.g., "Victoria Island, Lagos"
    price: { type: Number, required: true }, // e.g., 3340000000
    priceUnit: { type: String, default: "₦" }, // Currency symbol
    isForSale: { type: Boolean, default: false }, // For sale or rent
    isFeatured: { type: Boolean, default: false }, // Featured property
    bedrooms: { type: Number, required: true }, // Number of bedrooms
    bathrooms: { type: Number, required: true }, // Number of bathrooms
    images: [{ type: String }], // Array of image URLs
    video: { type: String }, // Video link (if applicable)
    description: { type: String }, // Additional details
    tags: [{ type: String }], // Tags like "For Rent", "Luxury", etc.
    bookmarkedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("House", houseSchema);
