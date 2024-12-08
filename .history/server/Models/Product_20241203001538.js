import mongoose from "mongoose";

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
  sustainabilityScore: Number,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Product", productSchema);
