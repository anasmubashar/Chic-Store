const {
  createOrder,
  getUserOrders,
  getOrderById,
} = require("../controllers/orderController.js");

const { userVerification } = require("../Middlewares/AuthMiddleware");

const router = require("express").Router();
router.post("/", userVerification, createOrder);
router.get("/", userVerification, getUserOrders);
router.get("/:id", userVerification, getOrderById);

module.exports = router;
