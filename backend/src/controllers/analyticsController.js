const asyncHandler = require("../middlewares/asyncHandler");
const Order = require("../models/Order");
const User = require("../models/User");
const Watch = require("../models/Watch");

const getDashboardStats = asyncHandler(async (req, res) => {
  const totalRevenue = await Order.aggregate([
    { $match: { status: "paid" } },
    { $group: { _id: null, total: { $sum: "$totalPrice" } } },
  ]);

  const ordersCount = await Order.countDocuments();
  const customersCount = await User.countDocuments({ role: "customer" });
  const productsCount = await Watch.countDocuments();

  const recentOrders = await Order.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .populate("customer", "fullName email");

  const lowStockProducts = await Watch.find({ stock: { $lte: 5 } }).limit(5);

  res.status(200).json({
    stats: {
      totalRevenue: totalRevenue[0]?.total || 0,
      ordersCount,
      customersCount,
      productsCount,
    },
    recentOrders,
    lowStockProducts,
  });
});

module.exports = {
  getDashboardStats,
};
