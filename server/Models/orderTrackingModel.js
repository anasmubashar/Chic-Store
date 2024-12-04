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

// Define the schema for the customer information
const customerInfoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  contactDetails: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  }
});

// Define the schema for the driver information
const driverInfoSchema = new mongoose.Schema({
  driverName: {
    type: String,
    required: true
  },
  vehicleDetails: {
    type: String,
    required: true
  }
});

// Define the schema for the order tracking
const orderTrackingSchema = new mongoose.Schema({
  trackingID: {
    type: String,
    required: true,
    unique: true
  },
  orderID: {
    type: String,
    required: true,
    unique: true
  },
  orderStatus: {
    type: String,
    enum: ['In Transit', 'In Progress', 'On Hold', 'Completed', 'Canceled'],
    required: true
  },
  currentLocation: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  routeDetails: {
    type: String,
    required: true
  },
  estimatedDeliveryTime: {
    type: Date,
    required: true
  },
  customerInfo: {
    type: customerInfoSchema,
    required: true
  },
  driverInfo: {
    type: driverInfoSchema,
    required: true
  },
  itemList: [itemSchema],
  deliveryStatus: {
    type: String,
    required: true
  }
});

// Create the model
const OrderTracking = mongoose.model('OrderTracking', orderTrackingSchema);

module.exports = OrderTracking;
