const Order = require("../Models/order.js");
const Product = require("../Models/product.js");

const createOrder = async (req, res) => {
  try {
    const { items, shippingAddress } = req.body;
    const { user } = req;

    let totalAmount = 0;
    for (let item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res
          .status(404)
          .json({ error: `Product ${item.product} not found` });
      }

      const sizeVariant = product.sizeVariants.find(
        (v) => v.size === item.size
      );

      if (!sizeVariant?.inStock) {
        return res.status(400).json({
          error: `${product.name} is out of stock in selected variant`,
        });
      }

      totalAmount += product.price * item.quantity;
    }

    const order = new Order({
      user: user._id,
      items,
      totalAmount,
      shippingAddress,
    });

    await order.save();

    user.orders.push(order._id);
    await user.save();

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("items.product")
      .sort("-createdAt");

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user._id,
    }).populate("items.product");

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createOrder, getUserOrders, getOrderById };
