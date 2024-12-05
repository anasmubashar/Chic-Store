const mongoose = require('mongoose');

// Define the schema for the item list
const itemSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  details: {
    type: String,
    required: true
  }
});

// Define the schema for the order
const orderSchema = new mongoose.Schema({
  orderID: {
    type: String,
    required: true,
    unique: true
  },
  createdDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  customerName: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    enum: ['Normal', 'High Priority'],
    required: true
  },
  orderTotal: {
    type: Number,
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['Paid', 'Unpaid', 'Refunded'],
    required: true
  },
  itemList: [itemSchema],
  deliveryNumber: {
    type: String,
    required: true
  },
  orderStatus: {
    type: String,
    enum: ['Drafts', 'In Progress', 'Completed', 'Canceled'],
    required: true
  }
});

// Create the model
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
