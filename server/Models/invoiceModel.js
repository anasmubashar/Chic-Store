const mongoose = require("mongoose");

const invoiceItemSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  unitPrice: {
    type: Number,
    required: true,
    min: 0
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  }
});

const invoiceSchema = new mongoose.Schema({
  invoiceNumber: {
    type: String,
    required: true,
    unique: true
  },
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  items: [invoiceItemSchema],
  subtotal: {
    type: Number,
    required: true,
    min: 0
  },
  tax: {
    type: Number,
    required: true,
    min: 0
  },
  totalAmount: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ["draft", "sent", "paid", "overdue", "cancelled", "refunded"],
    default: "draft"
  },
  dueDate: {
    type: Date,
    required: true
  },
  paymentDate: {
    type: Date
  },
  paymentMethod: {
    type: String,
    enum: ["cash", "bank_transfer", "credit_card", "debit_card", "other"],
    required: true
  },
  notes: {
    type: String,
    trim: true
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

// Indexes for common queries
invoiceSchema.index({ invoiceNumber: 1 });
invoiceSchema.index({ customerId: 1, createdAt: -1 });
invoiceSchema.index({ status: 1, dueDate: 1 });

// Update timestamps
invoiceSchema.pre("save", function(next) {
  this.updatedAt = Date.now();
  next();
});

// Calculate totals before saving
invoiceSchema.pre("save", function(next) {
  if (this.isModified("items")) {
    this.subtotal = this.items.reduce((sum, item) => sum + item.amount, 0);
    this.totalAmount = this.subtotal + this.tax;
  }
  next();
});

// Auto-update status based on due date
invoiceSchema.pre("save", function(next) {
  if (this.status !== "paid" && this.status !== "cancelled") {
    const today = new Date();
    if (this.dueDate < today) {
      this.status = "overdue";
    }
  }
  next();
});

module.exports = mongoose.model("Invoice", invoiceSchema);