const mongoose = require("mongoose");

const colorVariantSchema = new mongoose.Schema({
  color: { type: String, required: true },
  colorCode: { type: String, required: true },
  inStock: { type: Boolean, default: true },
});

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
  colorVariants: [colorVariantSchema],
  sizeVariants: [sizeVariantSchema],
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Product", productSchema);
