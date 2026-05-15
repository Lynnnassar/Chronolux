const asyncHandler = require("../middlewares/asyncHandler");
const orderService = require("../services/orderService");

const placeOrder = asyncHandler(async (req, res) => {
  const order = await orderService.placeOrder({
    customerId: req.user._id,
    items: req.body.items,
  });
  res.status(201).json(order);
});

const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await orderService.listMyOrders(req.user._id);
  res.status(200).json(orders);
});

const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await orderService.listAllOrders();
  res.status(200).json(orders);
});

const getOrderById = asyncHandler(async (req, res) => {
  const order = await orderService.getOrderById(req.params.id);
  res.status(200).json(order);
});

const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await orderService.updateOrderStatus(
    req.params.id,
    req.body.status,
  );
  res.status(200).json(order);
});

module.exports = {
  placeOrder,
  getMyOrders,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
};
