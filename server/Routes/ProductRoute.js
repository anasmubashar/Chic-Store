const {
  getAllProducts,
  getProductById,
  checkStock,
} = require("../Controllers/ProductController.js");

const router = require("express").Router();
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.get("/:id/stock", checkStock);

module.exports = router;
