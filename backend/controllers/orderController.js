import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import User from "../models/userModel.js";

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    user,
    orderItems,
    shippingAddress,
    paymentMethod,
    paymentResult,
    taxPrice,
    shippingPrice,
    discount,
    totalPrice,
    isProcessing,
    isShipped,
    isDelivered,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
    return;
  } else {
    const order = new Order({
      orderItems,
      user: user,
      shippingAddress,
      paymentMethod,
      paymentResult,
      taxPrice,
      shippingPrice,
      discount,
      totalPrice,
      isProcessing,
      isShipped,
      isDelivered,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

const getManufacturerOrders = asyncHandler(async (req, res) => {

const order = await Order.find({ "orderIems.product.user": { $elemMatch: { user: req.body.user }}})

if (order) {
  res.json(order)
} else {
  res.status(404)
  throw new Error('Order not found')
}

})

const updateOrderItemStatus = asyncHandler(async (req, res) => {

  //const order = await Order.updateOne({ _id: req.params._id, "orderItems._id": req.params._id},
  //{ $set: { "orderItems.$.status": req.body.status}})
  const order = await Order.findById(req.params.id)
  
  if (order) {
    order.isPaid = true
    
    const updatedOrder = await order.save()
    console.log(updatedOrder);
    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc    Update order to paid
// @route   GET /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.email_address,
    };

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Update order to delivered
// @route   GET /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.body.user });
  res.json(orders);
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name");
  res.json(orders);
});

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
};
