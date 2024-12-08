const asyncHandler = require('express-async-handler');
const OrderTracking = require('../Models/orderTrackingModel');
const Order = require('../Models/order');

// @desc    Track order by tracking number or order ID
// @route   GET /api/tracking
// @access  Public
exports.trackOrder = asyncHandler(async (req, res) => {
  const { trackingNumber, orderID } = req.query;

  let orderTracking;

  if (trackingNumber) {
    orderTracking = await OrderTracking.findOne({ trackingNumber })
      .populate('orderId')
      .populate('assignedDriver')
      .populate('assignedBus');
  } else if (orderID) {
    const order = await Order.findOne({ orderID });
    if (!order) {
      res.status(404);
      throw new Error('Order not found');
    }
    orderTracking = await OrderTracking.findOne({ orderId: order._id })
      .populate('orderId')
      .populate('assignedDriver')
      .populate('assignedBus');
  } else {
    res.status(400);
    throw new Error('Tracking number or Order ID is required');
  }

  if (!orderTracking) {
    res.status(404);
    throw new Error('Tracking information not found');
  }

  res.json({
    trackingNumber: orderTracking.trackingNumber,
    currentStatus: orderTracking.currentStatus,
    currentLocation: orderTracking.currentLocation,
    estimatedDelivery: orderTracking.estimatedDelivery,
    locationHistory: orderTracking.locationHistory,
    orderDetails: orderTracking.orderId,
    driverDetails: orderTracking.assignedDriver,
    vehicleDetails: orderTracking.assignedBus
  });
});

// @desc    Add location update for order tracking
// @route   POST /api/tracking/:trackingNumber/update
// @access  Private
exports.updateOrderLocation = asyncHandler(async (req, res) => {
  const { trackingNumber } = req.params;
  const { 
    location, 
    status, 
    notes 
  } = req.body;

  const orderTracking = await OrderTracking.findOne({ trackingNumber });

  if (!orderTracking) {
    res.status(404);
    throw new Error('Order tracking not found');
  }

  orderTracking.locationHistory.push({
    location: {
      type: 'Point',
      coordinates: location.coordinates,
      address: location.address
    },
    status,
    notes
  });

  orderTracking.currentLocation = {
    type: 'Point',
    coordinates: location.coordinates,
    lastUpdated: new Date()
  };

  orderTracking.currentStatus = status;

  await orderTracking.save();

  // Update corresponding order status
  await Order.findByIdAndUpdate(orderTracking.orderId, { 
    status: status === 'delivered' ? 'delivered' : 'in_transit' 
  });

  res.json(orderTracking);
});