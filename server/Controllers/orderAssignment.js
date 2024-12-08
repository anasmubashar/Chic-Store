const OrderAssignment = require('../Models/orderAssignmentModel');
const AssignmentHistory = require('../Models/assignmentHistoryModel');
const Bus = require('../Models/busModel');
const Driver = require('../Models/driverModel');
const Order = require('../Models/orderModel');

// Utility function to find the best available bus
const findBestBus = async (order) => {
  return await Bus.findOne({
    status: "available",
    "capacity.weight": { $gte: order.shipmentDetails.weight },
    isActive: true
  }).sort({ "capacity.weight": 1 });
};

// Utility function to find the best available driver
const findBestDriver = async (busLocation) => {
  return await Driver.findOne({
    isActive: true,
    assignedBus: null
  }).where('currentLocation').near({
    center: busLocation,
    spherical: true
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

    const assignment = new OrderAssignment({
      orderId: order._id,
      busId: bestBus._id,
      driverId: bestDriver._id,
      assignmentType: 'automatic',
      assignedBy: req.user._id,
      priority: order.priority,
      routeDetails: {
        startLocation: bestBus.currentLocation,
        endLocation: {
          type: 'Point',
          coordinates: [order.shippingAddress.coordinates]
        }
      }
    });

    await assignment.save();

    // Update bus and driver status
    bestBus.status = 'in_transit';
    bestDriver.assignedBus = bestBus._id;
    await Promise.all([bestBus.save(), bestDriver.save()]);

    res.status(201).json({ success: true, data: assignment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Manually assign order
exports.manualAssignment = async (req, res) => {
  try {
    const { orderId, busId, driverId } = req.body;

    const [order, bus, driver] = await Promise.all([
      Order.findById(orderId),
      Bus.findById(busId),
      Driver.findById(driverId)
    ]);

    if (!order || !bus || !driver) {
      return res.status(404).json({ success: false, message: 'Order, bus, or driver not found' });
    }

    if (bus.status !== 'available' || !bus.isActive) {
      return res.status(400).json({ success: false, message: 'Selected bus is not available' });
    }

    if (driver.assignedBus || !driver.isActive) {
      return res.status(400).json({ success: false, message: 'Selected driver is not available' });
    }

    const assignment = new OrderAssignment({
      orderId,
      busId,
      driverId,
      assignmentType: 'manual',
      assignedBy: req.user._id,
      priority: order.priority
    });

    await assignment.save();

    // Update statuses
    bus.status = 'in_transit';
    driver.assignedBus = busId;
    await Promise.all([bus.save(), driver.save()]);

    res.status(201).json({ success: true, data: assignment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update assignment
exports.updateAssignment = async (req, res) => {
  try {
    const assignment = await OrderAssignment.findById(req.params.id);
    if (!assignment) {
      return res.status(404).json({ success: false, message: 'Assignment not found' });
    }

    // Create history record
    const history = new AssignmentHistory({
      assignmentId: assignment._id,
      orderId: assignment.orderId,
      previousStatus: assignment.status,
      newStatus: req.body.status || assignment.status,
      reason: req.body.reason,
      changedBy: req.user._id
    });

    // Update assignment
    Object.assign(assignment, req.body);
    await Promise.all([assignment.save(), history.save()]);

    res.status(200).json({ success: true, data: assignment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get assignment details
exports.getAssignment = async (req, res) => {
  try {
    const assignment = await OrderAssignment.findById(req.params.id)
      .populate('orderId')
      .populate('busId')
      .populate('driverId');

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
    const query = { isActive: true };

    if (status) query.status = status;
    if (priority) query.priority = priority;

    const assignments = await OrderAssignment.find(query)
      .populate('orderId')
      .populate('busId')
      .populate('driverId')
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