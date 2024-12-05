const mongoose = require("mongoose");

const maintenanceRecordSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  type: {
    type: String,
    enum: ["routine", "repair", "emergency"],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  cost: {
    type: Number,
    required: true,
    min: 0
  },
  nextServiceDue: {
    type: Date,
    required: true
  }
});

const busSchema = new mongoose.Schema({
  busNumber: {
    type: String,
    required: [true, "Bus number is required"],
    unique: true,
    trim: true
  },
  licensePlate: {
    type: String,
    required: [true, "License plate is required"],
    unique: true,
    trim: true
  },
  capacity: {
    weight: {
      type: Number,
      required: [true, "Weight capacity is required"],
      min: [0, "Capacity cannot be negative"]
    },
    unit: {
      type: String,
      enum: ["kg", "ton"],
      default: "kg"
    }
  },
  condition: {
    type: String,
    enum: ["excellent", "good", "fair", "maintenance_required"],
    default: "good"
  },
  status: {
    type: String,
    enum: ["available", "in_transit", "maintenance", "out_of_service"],
    default: "available"
  },
  currentRoute: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Route",
    default: null
  },
  maintenanceHistory: [maintenanceRecordSchema],
  currentLocation: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point"
    },
    coordinates: {
      type: [Number],
      default: [0, 0]
    }
  },
  assignedDriver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Driver",
    default: null
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

busSchema.index({ currentLocation: "2dsphere" });

busSchema.pre("save", function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Bus", busSchema);