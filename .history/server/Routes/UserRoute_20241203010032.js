const express = require("express");
const {
  getProfile,
  updateProfile,
  addToWishlist,
  removeFromWishlist,
} = require("../Controllers/userController.js");

const router = express.Router();

router.get("/profile", getProfile);
router.patch("/profile", updateProfile);
router.post("/wishlist/:productId", addToWishlist);
router.delete("/wishlist/:productId", removeFromWishlist);

module.exports = router;
