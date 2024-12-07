const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
} = require("../Controllers/CartController.js");
const { userVerification } = require("../Middlewares/AuthMiddleware.js");

const router = require("express").Router();

router.get("/", userVerification, getCart);
router.post("/items", userVerification, addToCart);
router.patch("/items/:itemId", userVerification, updateCartItem);
router.delete("/items/:itemId", userVerification, removeFromCart);

module.exports = router;
