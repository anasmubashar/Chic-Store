const mongoose = require('mongoose');

// Define the schema for the cargo bus information
const busSchema = new mongoose.Schema({
  busID: {
    type: String,
    required: true,
    unique: true
  },
  licensePlate: {
    type: String,
    required: true
  },
  currentStatus: {
    type: String,
    enum: ['Available', 'Assigned', 'In Maintenance'],
    required: true
  },
  capacity: {
    type: Number,
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
  }
});

// Create the model
const Bus = mongoose.model('Bus', busSchema);

module.exports = Bus;
