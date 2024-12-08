const mongoose = require("mongoose");

const sizeVariantSchema = new mongoose.Schema({
  size: { type: String, required: true },
  inStock: { type: Boolean, default: true },
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  style: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  category: { type: String, required: true },
  collection: { type: String },
  fabric: {
    type: String,
    enum: ["Cotton", "Linen", "Wool", "Silk", "Cashmere"],
  },
  images: [String],
  color: { type: String, required: true },
  sizeVariants: [sizeVariantSchema],
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Product", productSchema);
