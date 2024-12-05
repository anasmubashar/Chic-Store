const mongoose = require('mongoose');

// Define the schema for the driver information
const driverSchema = new mongoose.Schema({
  driverName: {
    type: String,
    required: true
  },
  driverID: {
    type: String,
    required: true,
    unique: true
  },
  licenseNumber: {
    type: String,
    required: true
  },
  availabilityStatus: {
    type: String,
    enum: ['Available', 'Assigned', 'Unavailable'],
    required: true
  },
  assignedRoutes: {
    type: [String],
    required: true
  }
});

// Create the model
const Driver = mongoose.model('Driver', driverSchema);

module.exports = Driver;
