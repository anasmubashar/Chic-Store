// Routes/shipmentDetailsRoutes.js
const express = require('express');
const router = express.Router();
const {
  createShipmentDetails,
  getShipmentDetailsByOrderId,
  updateShipmentDetails,
  deleteShipmentDetails
} = require('../Controllers/shipmentController');

// Create a new shipment detail
router.post('/', createShipmentDetails);

// Get shipment details by order ID
router.get('/order/:orderId', getShipmentDetailsByOrderId);

// Update shipment details
router.put('/:id', updateShipmentDetails);

// Delete shipment details
router.delete('/:id', deleteShipmentDetails);

module.exports = router;
