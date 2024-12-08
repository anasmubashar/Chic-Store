const mongoose = require("mongoose");

const assignmentHistorySchema = new mongoose.Schema({
  assignmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "OrderAssignment",
    required: true
  },
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true
  },
  previousStatus: {
    type: String,
    enum: ["pending", "accepted", "rejected", "completed", "cancelled"],
    required: true
  },
  newStatus: {
    type: String,
    enum: ["pending", "accepted", "rejected", "completed", "cancelled"],
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  changedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  busDetails: {
    busId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bus"
    },
    status: String,
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point"
      },
      coordinates: [Number]
    }
  },
  driverDetails: {
    driverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Driver"
    },
    status: String,
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point"
      },
      coordinates: [Number]
    }
  },
  systemMetrics: {
    processingTime: Number,
    algorithmVersion: String,
    assignmentScore: Number
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Indexes for efficient querying
assignmentHistorySchema.index({ assignmentId: 1, createdAt: -1 });
assignmentHistorySchema.index({ orderId: 1, createdAt: -1 });
assignmentHistorySchema.index({ "busDetails.location": "2dsphere" });
assignmentHistorySchema.index({ "driverDetails.location": "2dsphere" });

module.exports = mongoose.model("AssignmentHistory", assignmentHistorySchema);