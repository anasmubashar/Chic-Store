const asyncHandler = require('express-async-handler');
const Bus = require('../Models/busModel');

// @desc    Add Bus Information
// @route   POST /api/buses
// @access  Private
const addBus = asyncHandler(async (req, res) => {
  const newBus = new Bus(req.body);
  await newBus.save();
  res.status(201).json(newBus);
});

// @desc    Edit Bus Information
// @route   PUT /api/buses/:id
// @access  Private
const editBus = asyncHandler(async (req, res) => {
  const updatedBus = await Bus.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updatedBus) {
    res.status(404);
    throw new Error('Bus not found');
  }
  res.status(200).json(updatedBus);
});

// @desc    Delete Bus Information
// @route   DELETE /api/buses/:id
// @access  Private
const deleteBus = asyncHandler(async (req, res) => {
  const deletedBus = await Bus.findByIdAndDelete(req.params.id);
  if (!deletedBus) {
    res.status(404);
    throw new Error('Bus not found');
  }
  res.status(200).json({ message: 'Bus deleted successfully' });
});

module.exports = {
  addBus,
  editBus,
  deleteBus
};
