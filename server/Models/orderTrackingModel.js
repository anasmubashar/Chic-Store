const mongoose = require("mongoose");

const locationUpdateSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point"
    },
    coordinates: {
      type: [Number],
      required: true
    },
    address: String
  },
  status: {
    type: String,
    enum: ["picked_up", "in_transit", "out_for_delivery", "delivered", "failed_delivery"],
    required: true
  },
  notes: String
});

const orderTrackingSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
    unique: true
  },
  trackingNumber: {
    type: String,
    required: true,
    unique: true
  },
  currentStatus: {
    type: String,
    enum: ["pending", "in_transit", "out_for_delivery", "delivered", "failed", "on_hold"],
    default: "pending"
  },
  assignedBus: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bus"
  },
  assignedDriver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Driver"
  },
  estimatedDelivery: {
    type: Date,
    required: true
  },
  actualDelivery: {
    type: Date
  },
  locationHistory: [locationUpdateSchema],
  currentLocation: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point"
    },
    coordinates: {
      type: [Number],
      default: [0, 0]
    },
    lastUpdated: {
      type: Date,
      default: Date.now
    }
  },
  statusUpdates: [{
    status: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    description: String
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

orderTrackingSchema.index({ currentLocation: "2dsphere" });
orderTrackingSchema.index({ trackingNumber: 1 });

orderTrackingSchema.pre("save", function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("OrderTracking", orderTrackingSchema);