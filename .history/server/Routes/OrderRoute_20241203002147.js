import express from "express";
import * as orderController from "../controllers/orderController.js";

const router = express.Router();

router.post("/", orderController.createOrder);
router.get("/", orderController.getUserOrders);
router.get("/:id", orderController.getOrderById);

export default router;
