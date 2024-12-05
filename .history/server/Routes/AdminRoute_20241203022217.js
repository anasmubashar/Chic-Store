import express from "express";
import * as adminController from "../controllers/adminController.js";
import adminMiddleware from "../middleware/admin.js";

const router = express.Router();

// Apply admin middleware to all routes
router.use(adminMiddleware);

router.post("/products", adminController.addProduct);
router.patch("/products/:id", adminController.updateProduct);
router.delete("/products/:id", adminController.deleteProduct);
router.get("/products", adminController.getAllProducts);

export default router;
