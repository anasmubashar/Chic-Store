const mongoose = require("mongoose");

const auditLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  action: {
    type: String,
    required: true,
    enum: [
      'profile_update',
      'driver_assignment',
      'route_modification',
      'order_status_change',
      'invoice_generation',
      'payment_processing',
      'maintenance_record',
      'system_setting_change'
    ]
  },
  entityType: {
    type: String,
    required: true,
    enum: [
      'Profile',
      'Driver',
      'Bus',
      'Order',
      'Route',
      'Invoice',
      'System'
    ]
  },
  entityId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  changes: {
    before: mongoose.Schema.Types.Mixed,
    after: mongoose.Schema.Types.Mixed
  },
  ipAddress: {
    type: String,
    required: true
  },
  userAgent: {
    type: String
  },
  status: {
    type: String,
    enum: ['success', 'failure', 'warning'],
    default: 'success'
  },
  notes: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

auditLogSchema.index({ userId: 1, createdAt: -1 });
auditLogSchema.index({ entityType: 1, entityId: 1 });
auditLogSchema.index({ action: 1, status: 1 });

module.exports = mongoose.model("AuditLog", auditLogSchema);