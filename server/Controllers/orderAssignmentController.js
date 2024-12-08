const Order = require('../Models/order');
const Bus = require('../Models/busModel');
const Driver = require('../Models/driverModel');
const OrderAssignment = require('../Models/orderAssignmentModel');

// Utility function to find the best available bus
const findBestBus = async (order) => {
  return await Bus.findOne({
    status: 'available',
    capacity: { $gte: order.weight },
  }).sort({ capacity: 1 });
};

// Utility function to find the best available driver
const findBestDriver = async (busLocation) => {
  return await Driver.findOne({
    isActive: true,
    assignedBus: null,
  }).where('currentLocation').near({
    center: busLocation,
    spherical: true,
  });
};

// Auto-assign order to bus and driver
exports.autoAssignOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    const bestBus = await findBestBus(order);
    if (!bestBus) {
      return res.status(400).json({ success: false, message: 'No suitable bus available' });
    }

    const bestDriver = await findBestDriver(bestBus.currentLocation.coordinates);
    if (!bestDriver) {
      return res.status(400).json({ success: false, message: 'No suitable driver available' });
    }

    const orderAssignment = new OrderAssignment({
      order: order._id,
      bus: bestBus._id,
      driver: bestDriver._id,
      assignedAt: Date.now(),
      status: 'assigned',
    });

    await orderAssignment.save();

    // Update order, bus, and driver status
    order.status = 'processing';
    bestBus.status = 'in_transit';
    bestDriver.isActive = false;
    bestDriver.assignedBus = bestBus._id;

    await Promise.all([order.save(), bestBus.save(), bestDriver.save()]);

    res.status(200).json({ success: true, data: orderAssignment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Manually assign order
exports.manualAssignment = async (req, res) => {
  try {
    const { orderId, busId, driverId } = req.body;

    const order = await Order.findById(orderId);
    const bus = await Bus.findById(busId);
    const driver = await Driver.findById(driverId);

    if (!order || !bus || !driver) {
      return res.status(404).json({ success: false, message: 'Order, bus, or driver not found' });
    }

    const orderAssignment = new OrderAssignment({
      order: order._id,
      bus: bus._id,
      driver: driver._id,
      assignedAt: Date.now(),
      status: 'assigned',
    });

    await orderAssignment.save();

    // Update order, bus, and driver status
    order.status = 'processing';
    bus.status = 'in_transit';
    driver.isActive = false;
    driver.assignedBus = bus._id;

    await Promise.all([order.save(), bus.save(), driver.save()]);

    res.status(200).json({ success: true, data: orderAssignment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update assignment
exports.updateAssignment = async (req, res) => {
  try {
    const { assignmentId, busId, driverId } = req.body;

    const assignment = await OrderAssignment.findById(assignmentId);
    if (!assignment) {
      return res.status(404).json({ success: false, message: 'Assignment not found' });
    }

    const newBus = await Bus.findById(busId);
    const newDriver = await Driver.findById(driverId);

    if (!newBus || !newDriver) {
      return res.status(404).json({ success: false, message: 'New bus or driver not found' });
    }

    // Update old bus and driver status
    await Bus.findByIdAndUpdate(assignment.bus, { status: 'available' });
    await Driver.findByIdAndUpdate(assignment.driver, { isActive: true, assignedBus: null });

    // Update assignment
    assignment.bus = newBus._id;
    assignment.driver = newDriver._id;
    await assignment.save();

    // Update new bus and driver status
    newBus.status = 'in_transit';
    newDriver.isActive = false;
    newDriver.assignedBus = newBus._id;
    await Promise.all([newBus.save(), newDriver.save()]);

    res.status(200).json({ success: true, data: assignment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get assignment details
exports.getAssignment = async (req, res) => {
  try {
    const assignment = await OrderAssignment.findById(req.params.id)
      .populate('order')
      .populate('bus')
      .populate('driver');

    if (!assignment) {
      return res.status(404).json({ success: false, message: 'Assignment not found' });
    }

    res.status(200).json({ success: true, data: assignment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// List all assignments with filters
exports.listAssignments = async (req, res) => {
  try {
    const { status, priority, page = 1, limit = 10 } = req.query;
    const query = {};

    if (status) query.status = status;
    if (priority) query.priority = priority;

    const assignments = await OrderAssignment.find(query)
      .populate('order')
      .populate('bus')
      .populate('driver')
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await OrderAssignment.countDocuments(query);

    res.status(200).json({
      success: true,
      data: assignments,
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
