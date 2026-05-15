const mongoose = require("mongoose");
const Order = require("../models/Order");
const Watch = require("../models/Watch");

const placeOrder = async ({ customerId, items }) => {
  if (!items || items.length === 0) {
    const error = new Error("Order items are required");
    error.statusCode = 400;
    throw error;
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const orderItems = [];
    let totalPrice = 0;

    for (const item of items) {
      const watch = await Watch.findById(item.watchId).session(session);
      if (!watch) {
        const error = new Error("Watch not found");
        error.statusCode = 404;
        throw error;
      }

      if (watch.stock < item.quantity) {
        const error = new Error("Insufficient stock");
        error.statusCode = 400;
        throw error;
      }

      watch.stock -= item.quantity;
      await watch.save({ session });

      orderItems.push({
        watch: watch._id,
        quantity: item.quantity,
        priceAtPurchase: watch.price,
      });

      totalPrice += watch.price * item.quantity;
    }

    const order = await Order.create(
      [
        {
          customer: customerId,
          items: orderItems,
          totalPrice,
        },
      ],
      { session },
    );

    await session.commitTransaction();
    session.endSession();

    return order[0];
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const listMyOrders = async (customerId) => {
  return Order.find({ customer: customerId })
    .populate("items.watch", "name price sku")
    .sort({ createdAt: -1 });
};

const listAllOrders = async () => {
  return Order.find()
    .populate("customer", "fullName email")
    .populate("items.watch", "name price sku")
    .sort({ createdAt: -1 });
};

const getOrderById = async (orderId) => {
  const order = await Order.findById(orderId)
    .populate("customer", "fullName email")
    .populate("items.watch", "name price sku");
  if (!order) {
    const error = new Error("Order not found");
    error.statusCode = 404;
    throw error;
  }
  return order;
};

const updateOrderStatus = async (orderId, status) => {
  const order = await Order.findByIdAndUpdate(
    orderId,
    { status },
    { new: true },
  );
  if (!order) {
    const error = new Error("Order not found");
    error.statusCode = 404;
    throw error;
  }
  return order;
};

module.exports = {
  placeOrder,
  listMyOrders,
  listAllOrders,
  getOrderById,
  updateOrderStatus,
};
