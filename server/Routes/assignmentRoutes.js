const express = require('express');
const router = express.Router();
const {
  autoAssignOrder,
  manualAssignment,
  updateAssignment,
  getAssignment,
  listAssignments
} = require('../Controllers/assignmentController');

// Auto-assign order to bus and driver
router.post('/auto-assign/:orderId', autoAssignOrder);

// Manually assign order
router.post('/manual-assign', manualAssignment);

// Update assignment
router.put('/:id', updateAssignment);

// Get assignment details
router.get('/:id', getAssignment);

// List all assignments
router.get('/', listAssignments);

module.exports = router;