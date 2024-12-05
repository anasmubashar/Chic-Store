const express = require("express");
const {
  addProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
} = require("../Controllers/adminController.js");
const { isAdmin } = require("../Middlewares/AuthMiddleware.js");

const router = express.Router();

// Apply admin middleware to all routes
router.use(isAdmin);

router.post("/products", addProduct);
router.patch("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);
router.get("/products", getAllProducts);

export default router;
