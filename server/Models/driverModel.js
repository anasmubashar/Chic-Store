const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Driver name is required"],
    trim: true
  },
  cnicNumber: {
    type: String,
    required: [true, "CNIC number is required"],
    unique: true,
    match: [/^\d{5}-\d{7}-\d{1}$/, "Please enter a valid CNIC number"],
    trim: true
  },
  phoneNumber: {
    type: String,
    required: [true, "Phone number is required"],
    match: [/^(\+92|0)?[0-9]{10}$/, "Please enter a valid Pakistani phone number"],
    trim: true
  },
  licenseNumber: {
    type: String,
    required: [true, "License number is required"],
    unique: true,
    trim: true
  },
  yearsOfExperience: {
    type: Number,
    required: [true, "Years of experience is required"],
    min: [0, "Years of experience cannot be negative"]
  },
  assignedBus: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bus",
    required: [true, "Assigned bus is required"]
  },
  address: {
    street: {
      type: String,
      required: [true, "Street address is required"],
      trim: true
    },
    city: {
      type: String,
      required: [true, "City is required"],
      trim: true
    },
    province: {
      type: String,
      required: [true, "Province is required"],
      enum: ["Punjab", "Sindh", "KPK", "Balochistan", "Gilgit-Baltistan", "AJK", "ICT"],
      trim: true
    },
    postalCode: {
      type: String,
      required: [true, "Postal code is required"],
      trim: true
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
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
  orders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order"
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Create index for geospatial queries
driverSchema.index({ currentLocation: "2dsphere" });

// Update the updatedAt timestamp before saving
driverSchema.pre("save", function(next) {
  this.updatedAt = Date.now();
  next();
});

// Validate CNIC format before saving
driverSchema.pre("save", function(next) {
  if (this.isModified("cnicNumber")) {
    const cnicRegex = /^\d{5}-\d{7}-\d{1}$/;
    if (!cnicRegex.test(this.cnicNumber)) {
      next(new Error("Invalid CNIC format. Use format: 12345-1234567-1"));
    }
  }
  next();
});

module.exports = mongoose.model("Driver", driverSchema);