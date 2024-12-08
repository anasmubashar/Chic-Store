const {
  getProfile,
  updateProfile,
  addToWishlist,
  removeFromWishlist,
} = require("../Controllers/userController.js");

const router = require("express").Router();

router.get("/profile", userVerification, getProfile);
router.patch("/profile", userVerification, updateProfile);
router.post("/wishlist/:productId", userVerification, addToWishlist);
router.delete("/wishlist/:productId", userVerification, removeFromWishlist);

module.exports = router;
