import express from "express";
import * as userController from "../controllers/userController.js";

const router = express.Router();

router.get("/profile", userController.getProfile);
router.patch("/profile", userController.updateProfile);
router.post("/wishlist/:productId", userController.addToWishlist);
router.delete("/wishlist/:productId", userController.removeFromWishlist);

export default router;
