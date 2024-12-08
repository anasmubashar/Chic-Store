const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Courier service name is required"],
    trim: true
  },
  location: {
    type: String,
    required: [true, "Primary location is required"],
    trim: true
  },
  cities: [{
    name: {
      type: String,
      required: true,
      trim: true
    },
    isActive: {
      type: Boolean,
      default: true
    }
  }],
  numberOfBuses: {
    type: Number,
    required: [true, "Number of buses is required"],
    min: [1, "Must have at least one bus"]
  },
  numberOfDrivers: {
    type: Number,
    required: [true, "Number of drivers is required"],
    min: [1, "Must have at least one driver"]
  },
  contactDetails: {
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
      match: [/^(\+92|0)?[0-9]{10}$/, "Please enter a valid Pakistani phone number"]
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true
    }
  },
  profilePicture: {
    type: String,
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

// Update the updatedAt timestamp before saving
profileSchema.pre("save", function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Profile", profileSchema);