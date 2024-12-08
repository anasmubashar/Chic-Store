const Bus = require('../Models/busModel');
const Driver = require('../Models/driverModel');

// Get all buses with pagination
// @desc    Get invoices with pagination and filtering
// @route   GET http://localhost:4000/api/bus
// @access  Private
exports.getBuses = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const buses = await Bus.find({ isActive: true })
      .populate('assignedDriver', 'name phoneNumber')
      .populate('currentRoute', 'status estimatedDuration')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Bus.countDocuments({ isActive: true });

    res.status(200).json({
      success: true,
      data: buses,
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

// 
// @desc   Get single bus
// @route   GET /api/:id
// @access  Private
exports.getBus = async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id)
      .populate('assignedDriver', 'name phoneNumber')
      .populate('currentRoute', 'status estimatedDuration');

    if (!bus || !bus.isActive) {
      return res.status(404).json({ success: false, message: 'Bus not found' });
    }

    res.status(200).json({ success: true, data: bus });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//
// @desc    Create new bus
// @route   POST /api/:id
// @access  Private

exports.createBus = async (req, res) => {
  console.log(`bus create`);
  try {
    const bus = new Bus(req.body);
    await bus.save();

    res.status(201).json({ success: true, data: bus });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update bus
// @route   PUT http://localhost:4000/api/bus/67529f1410b52d8e4d65ba9b
// @access  Private
exports.updateBus = async (req, res) => {
  try {
    const bus = await Bus.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!bus) {
      return res.status(404).json({ success: false, message: 'Bus not found' });
    }

    res.status(200).json({ success: true, data: bus });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete bus
exports.deleteBus = async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id);
    
    if (!bus || !bus.isActive) {
      return res.status(404).json({ success: false, message: 'Bus not found' });
    }

    // Remove bus assignment from driver
    if (bus.assignedDriver) {
      await Driver.findByIdAndUpdate(bus.assignedDriver, {
        assignedBus: null
      });
    }

    bus.isActive = false;
    await bus.save();

    res.status(200).json({ success: true, message: 'Bus deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Add maintenance record
exports.addMaintenanceRecord = async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id);
    
    if (!bus || !bus.isActive) {
      return res.status(404).json({ success: false, message: 'Bus not found' });
    }

    bus.maintenanceHistory.push(req.body);
    bus.condition = req.body.type === 'emergency' ? 'maintenance_required' : bus.condition;
    await bus.save();

    res.status(200).json({ success: true, data: bus });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};