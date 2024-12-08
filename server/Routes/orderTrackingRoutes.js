const express = require('express');
const router = express.Router();
const {
  trackOrder,
  updateOrderLocation
} = require('../Controllers/orderTrackingController');
const { protect, adminOnly } = require('../Middleware/authMiddleware');

router.route('/')
  .get(trackOrder);

router.route('/:trackingNumber/update')
  .post(protect, adminOnly, updateOrderLocation);

module.exports = router;