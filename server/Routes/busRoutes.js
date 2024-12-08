const express = require('express');
const router = express.Router();
const {
  getBuses,
  getBus,
  createBus,
  updateBus,
  deleteBus,
  addMaintenanceRecord
} = require('../Controllers/busController');

router.get('/', getBuses);
router.get('/:id', getBus);
router.post('/', createBus);
router.put('/:id', updateBus);
router.delete('/:id', deleteBus);
router.post('/:id/maintenance', addMaintenanceRecord);

module.exports = router;