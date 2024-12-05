const express = require('express');
const router = express.Router();
const { addDriver, editDriver, deleteDriver } = require('../Controllers/driverController');

// Add Driver Information
router.post('/drivers', addDriver);

// Edit Driver Information
router.put('/drivers/:id', editDriver);

// Delete Driver Information
router.delete('/drivers/:id', deleteDriver);

module.exports = router;
