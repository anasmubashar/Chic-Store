const express = require('express');
const router = express.Router();
const {
  getOrders,
  createOrder,
  getOrderById,
  updateOrderStatus
} = require('../Controllers/orderDelivery');

//const { protect, adminOnly } = require('../middleware/authMiddleware');

router.route('/')
  .get( getOrders)
  

router.route('/:id')
  .get(getOrderById)
  .put(updateOrderStatus);

module.exports = router;