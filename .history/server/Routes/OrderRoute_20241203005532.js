import express from "express";
const {createOrder, getUserOrders, getOrderById} = require("../controllers/orderController.js");

const router = express.Router();

router.post("/", createOrder);
router.get("/", getUserOrders);
router.get("/:id", const {createOrder, getUserOrders, getOrderById} = require("../controllers/orderController.js");
);

export default router;
