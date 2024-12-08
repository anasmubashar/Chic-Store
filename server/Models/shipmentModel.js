// Models/shipmentDetailsModel.js
const mongoose = require('mongoose');

const shipmentDetailsSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  dimensions: {
    length: { type: Number, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true }
  },
  specialInstructions: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('ShipmentDetails', shipmentDetailsSchema);
