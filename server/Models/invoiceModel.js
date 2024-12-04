const mongoose = require('mongoose');

// Define the schema for the invoice
const invoiceSchema = new mongoose.Schema({
  invoiceID: {
    type: String,
    required: true,
    unique: true
  },
  customerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  invoiceAmount: {
    type: Number,
    required: true
  },
  invoiceDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  dueDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['Sent', 'Overdue', 'Pending'],
    required: true
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

// Middleware to update the `updatedAt` field before each save
invoiceSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Create the model
const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;
