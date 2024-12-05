const express = require("express");
const {
  getAllProducts,
  getProductById,
  checkStock,
} = require("../Controllers/productController.js");

const router = express.Router();

router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.get("/:id/stock", productController.checkStock);

export default router;
