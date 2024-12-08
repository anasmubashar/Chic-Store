const mongoose = require("mongoose");

const stopSchema = new mongoose.Schema({
  routeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Route",
    required: [true, "Route ID is required"]
  },
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: [true, "Order ID is required"]
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point"
    },
    coordinates: {
      type: [Number],
      required: [true, "Stop coordinates are required"]
    },
    address: {
      type: String,
      required: [true, "Delivery address is required"]
    }
  },
  sequence: {
    type: Number,
    required: [true, "Stop sequence is required"]
  },
  estimatedArrival: {
    type: Date,
    required: [true, "Estimated arrival time is required"]
  },
  actualArrival: {
    type: Date,
    default: null
  },
  status: {
    type: String,
    enum: ["pending", "arrived", "completed", "failed", "skipped"],
    default: "pending"
  },
  deliveryWindow: {
    start: {
      type: Date,
      required: [true, "Delivery window start time is required"]
    },
    end: {
      type: Date,
      required: [true, "Delivery window end time is required"]
    }
  },
  notes: {
    type: String,
    trim: true
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

stopSchema.index({ location: "2dsphere" });
stopSchema.index({ routeId: 1, sequence: 1 }, { unique: true });

stopSchema.pre("save", function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Stop", stopSchema);