const mongoose = require('mongoose');

// Define the schema for the order information
const orderSchema = new mongoose.Schema({
  orderID: {
    type: String,
    required: true,
    unique: true
  },
  deliveryAddress: {
    type: String,
    required: true
  },
  priorityLevel: {
    type: String,
    enum: ['Normal', 'High Priority'],
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  dimensions: {
    type: String,
    required: true
  }
});

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

// Define the schema for the assignment
const assignmentSchema = new mongoose.Schema({
  order: {
    type: orderSchema,
    required: true
  },
  bus: {
    type: busSchema,
    required: true
  },
  driver: {
    type: driverSchema,
    required: true
  },
  assignmentStatus: {
    type: String,
    enum: ['Assigned', 'In Progress', 'Completed', 'Canceled'],
    required: true
  },
  assignedDate: {
    type: Date,
    default: Date.now
  }
});

// Create the model
const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;
