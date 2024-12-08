const express = require("express");
const {
  getAllProducts,
  getProductById,
  checkStock,
} = require("../Controllers/productController.js");

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.get("/:id/stock", checkStock);

module.exports = router;
