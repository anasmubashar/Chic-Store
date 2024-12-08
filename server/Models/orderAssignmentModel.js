const mongoose = require("mongoose");

const orderAssignmentSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: [true, "Order ID is required"]
  },
  busId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bus",
    required: [true, "Bus ID is required"]
  },
  driverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Driver",
    required: [true, "Driver ID is required"]
  },
  assignmentType: {
    type: String,
    enum: ["automatic", "manual"],
    required: true
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected", "completed", "cancelled"],
    default: "pending"
  },
  priority: {
    type: String,
    enum: ["normal", "high", "urgent"],
    default: "normal"
  },
  assignedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  routeDetails: {
    startLocation: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point"
      },
      coordinates: {
        type: [Number],
        required: true
      }
    },
    endLocation: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point"
      },
      coordinates: {
        type: [Number],
        required: true
      }
    },
    estimatedDistance: Number,
    estimatedDuration: Number
  },
  shipmentDetails: {
    weight: {
      value: Number,
      unit: {
        type: String,
        enum: ["kg", "ton"],
        default: "kg"
      }
    },
    dimensions: {
      length: Number,
      width: Number,
      height: Number,
      unit: {
        type: String,
        enum: ["cm", "m"],
        default: "cm"
      }
    }
  },
  notifications: [{
    type: {
      type: String,
      enum: ["assignment", "status_update", "delay", "completion"],
      required: true
    },
    message: String,
    timestamp: {
      type: Date,
      default: Date.now
    },
    isRead: {
      type: Boolean,
      default: false
    }
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

// Indexes for efficient querying
orderAssignmentSchema.index({ orderId: 1, status: 1 });
orderAssignmentSchema.index({ busId: 1, status: 1 });
orderAssignmentSchema.index({ driverId: 1, status: 1 });
orderAssignmentSchema.index({ "routeDetails.startLocation": "2dsphere" });
orderAssignmentSchema.index({ "routeDetails.endLocation": "2dsphere" });

// Update timestamp before saving
orderAssignmentSchema.pre("save", function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("OrderAssignment", orderAssignmentSchema);