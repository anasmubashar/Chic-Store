const express = require('express');
const router = express.Router();
const { addBus, editBus, deleteBus } = require('../Controllers/busController');

// Add Bus Information
router.post('/buses', addBus);

// Edit Bus Information
router.put('/buses/:id', editBus);

// Delete Bus Information
router.delete('/buses/:id', deleteBus);

module.exports = router;
