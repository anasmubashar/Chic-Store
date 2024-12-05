import express from "express";
import * as userController from "../controllers/userController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);

router.use(authMiddleware);

router.get("/profile", userController.getProfile);
router.patch("/profile", userController.updateProfile);
router.post("/wishlist/:productId", userController.addToWishlist);
router.delete("/wishlist/:productId", userController.removeFromWishlist);

export default router;
