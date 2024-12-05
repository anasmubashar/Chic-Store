const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
} = require("../Controllers/CartController.js");
const { userVerification } = require("../Middlewares/AuthMiddleware.js");

const router = require("express").Router();

// router.use(userVerification);

router.get("/", getCart);
router.post("/items", addToCart);
router.patch("/items/:itemId", updateCartItem);
router.delete("/items/:itemId", removeFromCart);

module.exports = router;
