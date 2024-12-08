const mongoose = require("mongoose");

const routeSchema = new mongoose.Schema({
  driverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Driver",
    required: [true, "Driver ID is required"]
  },
  startLocation: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point"
    },
    coordinates: {
      type: [Number],
      required: [true, "Start location coordinates are required"]
    },
    address: {
      type: String,
      required: [true, "Start location address is required"]
    }
  },
  status: {
    type: String,
    enum: ["pending", "in-progress", "completed", "cancelled"],
    default: "pending"
  },
  totalDistance: {
    type: Number,
    required: [true, "Total route distance is required"]
  },
  estimatedDuration: {
    type: Number,
    required: [true, "Estimated duration is required"]
  },
  actualDuration: {
    type: Number,
    default: null
  },
  priority: {
    type: String,
    enum: ["normal", "high", "urgent"],
    default: "normal"
  },
  mapProvider: {
    type: String,
    enum: ["google", "mapbox", "osrm"],
    required: true
  },
  routePolyline: {
    type: String,
    required: [true, "Route polyline is required"]
  },
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

routeSchema.index({ startLocation: "2dsphere" });

routeSchema.pre("save", function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Route", routeSchema);