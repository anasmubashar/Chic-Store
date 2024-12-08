// Controllers/shipmentDetailsController.js
const ShipmentDetails = require('../Models/shipmentModel');
const Order = require('../Models/order');

// Create a new shipment detail
exports.createShipmentDetails = async (req, res) => {
  try {
    const { orderId, weight, dimensions, specialInstructions } = req.body;

    const shipmentDetails = new ShipmentDetails({
      orderId,
      weight,
      dimensions,
      specialInstructions
    });

    await shipmentDetails.save();

    res.status(201).json({ success: true, data: shipmentDetails });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get shipment details by order ID
exports.getShipmentDetailsByOrderId = async (req, res) => {
  try {
    const shipmentDetails = await ShipmentDetails.findOne({ orderId: req.params.orderId });

    if (!shipmentDetails) {
      return res.status(404).json({ success: false, message: 'Shipment details not found' });
    }

    res.status(200).json({ success: true, data: shipmentDetails });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// Update shipment details
exports.updateShipmentDetails = async (req, res) => {
  try {
    const shipmentDetails = await ShipmentDetails.findById(req.params.id);

    if (!shipmentDetails) {
      return res.status(404).json({ success: false, message: 'Shipment details not found' });
    }

    Object.assign(shipmentDetails, req.body);
    await shipmentDetails.save();

    res.status(200).json({ success: true, data: shipmentDetails });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete shipment details
exports.deleteShipmentDetails = async (req, res) => {
  try {
    const shipmentDetails = await ShipmentDetails.findById(req.params.id);

    if (!shipmentDetails) {
      return res.status(404).json({ success: false, message: 'Shipment details not found' });
    }

    await shipmentDetails.remove();

    res.status(200).json({ success: true, message: 'Shipment details deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};