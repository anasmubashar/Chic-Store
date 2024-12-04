const asyncHandler = require('express-async-handler');
const Driver = require('../Models/driverModel');

// @desc    Add Driver Information
// @route   POST /api/drivers
// @access  Private
const addDriver = asyncHandler(async (req, res) => {
  const newDriver = new Driver(req.body);
  await newDriver.save();
  res.status(201).json(newDriver);
});

// @desc    Edit Driver Information
// @route   PUT /api/drivers/:id
// @access  Private
const editDriver = asyncHandler(async (req, res) => {
  const updatedDriver = await Driver.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updatedDriver) {
    res.status(404);
    throw new Error('Driver not found');
  }
  res.status(200).json(updatedDriver);
});

// @desc    Delete Driver Information
// @route   DELETE /api/drivers/:id
// @access  Private
const deleteDriver = asyncHandler(async (req, res) => {
  const deletedDriver = await Driver.findByIdAndDelete(req.params.id);
  if (!deletedDriver) {
    res.status(404);
    throw new Error('Driver not found');
  }
  res.status(200).json({ message: 'Driver deleted successfully' });
});

module.exports = {
  addDriver,
  editDriver,
  deleteDriver
};
