const asyncHandler = require('express-async-handler');
const Order = require('../Models/order');
const OrderTracking = require('../Models/orderTrackingModel');

// @desc    Get orders with search and filter
// @route   GET /api/orders
// @access  Private
exports.getOrders = asyncHandler(async (req, res) => {
  const { 
    page = 1, 
    limit = 10, 
    search = '', 
    status, 
    startDate, 
    endDate 
  } = req.query;

  const query = {};

  if (search) {
    query.$or = [
      { orderID: { $regex: search, $options: 'i' } },
      { 'user.name': { $regex: search, $options: 'i' } }
    ];
  }

  if (status) query.status = status;

  if (startDate && endDate) {
    query.createdAt = {
      $gte: new Date(startDate),
      $lte: new Date(endDate)
    };
  }

  const totalOrders = await Order.countDocuments(query);
  const totalPages = Math.ceil(totalOrders / limit);

  const orders = await Order.find(query)
    .populate('user', 'name email')
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));

  res.json({
    orders,
    currentPage: Number(page),
    totalPages,
    totalOrders
  });
});

// @desc    Create a new order
// @route   POST /api/orders
// @access  Private
exports.createOrder = asyncHandler(async (req, res) => {
  const { 
    user, 
    items, 
    totalAmount, 
    shippingAddress, 
    priority, 
    paymentStatus,
    deliveryNumber
  } = req.body;

  const orderID = `ORD-${Date.now()}`;

  const newOrder = new Order({
    user,
    items,
    totalAmount,
    shippingAddress,
    priority,
    paymentStatus,
    deliveryNumber,
    orderID,
    status: 'pending'
  });

  const savedOrder = await newOrder.save();

  // Create corresponding order tracking
  await OrderTracking.create({
    orderId: savedOrder._id,
    trackingNumber: `TRK-${Date.now()}`,
    estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
  });

  res.status(201).json(savedOrder);
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
exports.getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate('user')
    .populate('items.product');

  const orderTracking = await OrderTracking.findOne({ orderId: req.params.id })
    .populate('assignedDriver');

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  res.json({ order, orderTracking });
});

// @desc    Update order status
// @route   PUT /api/orders/:id
// @access  Private
exports.updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  order.status = status;
  await order.save();

  // Update corresponding order tracking
  await OrderTracking.findOneAndUpdate(
    { orderId: order._id },
    { currentStatus: status }
  );

  res.json(order);
});