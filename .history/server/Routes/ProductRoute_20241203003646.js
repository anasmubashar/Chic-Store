import express from "express";
import * as productController from "../Controllers/productController.js";

const router = express.Router();

router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.get("/:id/stock", productController.checkStock);

export default router;
