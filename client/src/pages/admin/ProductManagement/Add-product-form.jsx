"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { withCookies } from "react-cookie";
import api from "@/lib/axios";

export default function AddProductForm({ onAdd, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    style: "",
    description: "",
    price: "",
    category: "",
    collection: "",
    fabric: "",
    images: "",
    color: "",
    sizeVariants: "",
    featured: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Transform the sizeVariants input into the required format
    const sizeVariants = formData.sizeVariants.split(",").map((size) => ({
      size: size.trim(),
      stock: 30, // Default stock value
      inStock: true, // You can change this based on availability
    }));
    // Create the final product data
    const productData = {
      ...formData,
      price: parseFloat(formData.price), // Ensure price is a number
      images: formData.images.split(",").map((url) => url.trim()), // Convert image URLs into an array
      sizeVariants: sizeVariants,
      featured: Boolean(formData.featured), // Ensure featured is a boolean
    };

    // Call the addData function to send the product data
    addData(productData);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const addData = async (productData) => {
    console.log("Adding product:", productData);
    console.log("Adding product:", productData);
    try {
      const res = await api.post("/admin/products", productData);
      console.log("Product added successfully:", res.data); // More descriptive log
    } catch (error) {
      console.log(
        "Error adding product:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Add New Product</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
            addData();
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium mb-1">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              required
              className="w-full px-3 py-2 border rounded-lg"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Style</label>
            <input
              type="text"
              name="style"
              className="w-full px-3 py-2 border rounded-lg"
              value={formData.style}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              className="w-full px-3 py-2 border rounded-lg"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Price</label>
            <input
              type="number"
              name="price"
              required
              step="0.01"
              min="0"
              className="w-full px-3 py-2 border rounded-lg"
              value={formData.price}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <input
              type="text"
              name="category"
              required
              className="w-full px-3 py-2 border rounded-lg"
              value={formData.category}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Collection</label>
            <input
              type="text"
              name="collection"
              className="w-full px-3 py-2 border rounded-lg"
              value={formData.collection}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Fabric</label>
            <input
              type="text"
              name="fabric"
              className="w-full px-3 py-2 border rounded-lg"
              value={formData.fabric}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Image URLs (comma-separated)
            </label>
            <textarea
              name="images"
              className="w-full px-3 py-2 border rounded-lg"
              value={formData.images}
              onChange={handleChange}
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Color</label>
            <input
              type="text"
              name="color"
              className="w-full px-3 py-2 border rounded-lg"
              value={formData.color}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Size Variants (comma-separated)
            </label>
            <input
              type="text"
              name="sizeVariants"
              className="w-full px-3 py-2 border rounded-lg"
              value={formData.sizeVariants}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="mr-2"
            />
            <label className="text-sm font-medium">Featured</label>
          </div>
          <div className="flex gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="w-full px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
          
    </div>
  );
}
