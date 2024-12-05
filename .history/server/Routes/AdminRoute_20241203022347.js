import express from "express";
import * as adminController from "../controllers/adminController.js";
const { isAdmin } = require("../Middlewares/AuthMiddleware.js");

const router = express.Router();

// Apply admin middleware to all routes
router.use(isAdmin);

router.post("/products", adminController.addProduct);
router.patch("/products/:id", adminController.updateProduct);
router.delete("/products/:id", adminController.deleteProduct);
router.get("/products", adminController.getAllProducts);

export default router;
