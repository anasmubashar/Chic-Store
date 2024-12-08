const Driver = require('../Models/driverModel');
const Bus = require('../Models/busModel');
const { validatePhoneNumber, validateCNIC } = require('../utils/validators');

// Get all drivers with pagination
exports.getDrivers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const drivers = await Driver.find({ isActive: true })
      .populate('assignedBus', 'busNumber licensePlate')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Driver.countDocuments({ isActive: true });

    res.status(200).json({
      success: true,
      data: drivers,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single driver
exports.getDriver = async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id)
      .populate('assignedBus', 'busNumber licensePlate');

    if (!driver || !driver.isActive) {
      return res.status(404).json({ success: false, message: 'Driver not found' });
    }

    res.status(200).json({ success: true, data: driver });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create new driver
exports.createDriver = async (req, res) => {
  try {
    if (!validatePhoneNumber(req.body.phoneNumber)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Pakistani phone number format'
      });
    }

    if (!validateCNIC(req.body.cnicNumber)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid CNIC format'
      });
    }

    // Verify bus exists and is available
    const bus = await Bus.findById(req.body.assignedBus);
    if (!bus || !bus.isActive) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or inactive bus assignment'
      });
    }

    const driver = new Driver(req.body);
    await driver.save();

    // Update bus with assigned driver
    await Bus.findByIdAndUpdate(req.body.assignedBus, {
      assignedDriver: driver._id
    });

    res.status(201).json({ success: true, data: driver });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update driver
exports.updateDriver = async (req, res) => {
  try {
    if (req.body.phoneNumber && !validatePhoneNumber(req.body.phoneNumber)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Pakistani phone number format'
      });
    }

    if (req.body.cnicNumber && !validateCNIC(req.body.cnicNumber)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid CNIC format'
      });
    }

    if (req.body.assignedBus) {
      const bus = await Bus.findById(req.body.assignedBus);
      if (!bus || !bus.isActive) {
        return res.status(400).json({
          success: false,
          message: 'Invalid or inactive bus assignment'
        });
      }
    }

    const driver = await Driver.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!driver) {
      return res.status(404).json({ success: false, message: 'Driver not found' });
    }

    res.status(200).json({ success: true, data: driver });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete driver
exports.deleteDriver = async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id);
    
    if (!driver || !driver.isActive) {
      return res.status(404).json({ success: false, message: 'Driver not found' });
    }

    // Remove driver assignment from bus
    if (driver.assignedBus) {
      await Bus.findByIdAndUpdate(driver.assignedBus, {
        assignedDriver: null
      });
    }

    driver.isActive = false;
    await driver.save();

    res.status(200).json({ success: true, message: 'Driver deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};