const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
} = require("../Controllers/CartController.js");
const authMiddleware = require("../middleware/auth.js");

const router = require("express").Router();

router.use(authMiddleware);

router.get("/", getCart);
router.post("/items", addToCart);
router.patch("/items/:itemId", updateCartItem);
router.delete("/items/:itemId", removeFromCart);

module.exports = router;
