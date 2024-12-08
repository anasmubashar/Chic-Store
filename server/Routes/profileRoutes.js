const express = require('express');
const router = express.Router();
const { 
  getProfile, 
  createProfile, 
  updateProfile, 
  deleteProfile 
} = require('../Controllers/profileController');

router.get('/', getProfile);
router.post('/', createProfile);
router.put('/:id', updateProfile);
router.delete('/:id', deleteProfile);

module.exports = router;