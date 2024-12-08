const mongoose = require('mongoose');
const { INVOICE_STATUSES } = require('../constants/invoiceConstants');

// Invoice Item Schema for line items
const invoiceItemSchema = new mongoose.Schema({
  productId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'products', 
    required: true 
  },
  productName: { 
    type: String, 
   
  },
  quantity: { 
    type: Number, 
    required: true, 
    min: [1, 'Quantity must be at least 1'] 
  },
  unitPrice: { 
    type: Number, 
    required: true, 
    min: [0, 'Unit price cannot be negative'] 
  },
  subtotal: { 
    type: Number, 
    required: true, 
    min: [0, 'Subtotal cannot be negative'] 
  }
});

// Main Invoice Schema
const invoiceSchema = new mongoose.Schema({
  invoiceNumber: {
    type: String, 
    required: true, 
    unique: true,
    default: () => `INV-${Date.now()}`
  },
  
  orderId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'orders', 
    required: true
  },
  
  customerId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'customers', 
    required: true
  },
  
  invoiceItems: [invoiceItemSchema],
  
  subtotal: {
    type: Number, 
    required: true,
    min: [0, 'Subtotal cannot be negative']
  },
  
  taxRate: {
    type: Number, 
    default: 0,
    min: [0, 'Tax rate cannot be negative'],
    max: [100, 'Tax rate cannot exceed 100%']
  },
  
  taxAmount: {
    type: Number, 
    required: true,
    min: [0, 'Tax amount cannot be negative']
  },
  
  totalAmount: {
    type: Number, 
    required: true,
    min: [0, 'Total amount cannot be negative']
  },
  
  invoiceDate: {
    type: Date, 
    default: Date.now,
    required: true
  },
  
  dueDate: {
    type: Date, 
    required: true,
    validate: {
      validator: function(value) {
        return value >= this.invoiceDate;
      },
      message: 'Due date must be on or after the invoice date'
    }
  },
  
  status: {
    type: String,
    enum: Object.values(INVOICE_STATUSES),
    default: INVOICE_STATUSES.DRAFT
  },
  
  paymentDate: {
    type: Date,
    default: null
  },
  
  createdAt: {
    type: Date, 
    default: Date.now
  },
  
  updatedAt: {
    type: Date, 
    default: Date.now
  }
}, {
  timestamps: true
});

// Pre-save middleware to calculate totals and update status
invoiceSchema.pre('save', function(next) {
  // Calculate subtotal from invoice items
  if (this.invoiceItems && this.invoiceItems.length > 0) {
    this.subtotal = this.invoiceItems.reduce((total, item) => {
      item.subtotal = item.quantity * item.unitPrice;
      return total + item.subtotal;
    }, 0);
    
    // Calculate tax amount
    this.taxAmount = this.subtotal * (this.taxRate / 100);
    
    // Calculate total amount
    this.totalAmount = this.subtotal + this.taxAmount;
  }
  
  // Automatically update status based on dates
  const now = new Date();
  if (this.paymentDate) {
    this.status = INVOICE_STATUSES.PAID;
  } else if (now > this.dueDate) {
    this.status = INVOICE_STATUSES.OVERDUE;
  } else if (this.invoiceDate <= now) {
    this.status = INVOICE_STATUSES.SENT;
  }
  
  next();
});

// Static method for status constants
invoiceSchema.statics.STATUS = INVOICE_STATUSES;

// Indexing for performance and search optimization
invoiceSchema.index({ 
  invoiceNumber: 'text', 
  'customerId': 1, 
  'orderId': 1,
  status: 1, 
  invoiceDate: -1 
});

module.exports = mongoose.model('invoices', invoiceSchema);