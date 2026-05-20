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

const getAnalyticsReport = asyncHandler(async (req, res) => {
  const now = new Date();
  const rangeStart = new Date(now);
  rangeStart.setDate(rangeStart.getDate() - 29);
  rangeStart.setHours(0, 0, 0, 0);

  const revenueTrend = await Order.aggregate([
    { $match: { status: "paid", createdAt: { $gte: rangeStart } } },
    {
      $group: {
        _id: {
          $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
        },
        total: { $sum: "$totalPrice" },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  const brandSales = await Order.aggregate([
    { $match: { status: "paid" } },
    { $unwind: "$items" },
    {
      $lookup: {
        from: "watches",
        localField: "items.watch",
        foreignField: "_id",
        as: "watch",
      },
    },
    { $unwind: { path: "$watch", preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        from: "brands",
        localField: "watch.brand",
        foreignField: "_id",
        as: "brand",
      },
    },
    { $unwind: { path: "$brand", preserveNullAndEmptyArrays: true } },
    {
      $group: {
        _id: { $ifNull: ["$brand.name", "Unknown"] },
        total: { $sum: { $multiply: ["$items.quantity", "$items.priceAtPurchase"] } },
      },
    },
    { $project: { _id: 0, brand: "$_id", revenue: "$total" } },
    { $sort: { revenue: -1 } },
  ]);

  const trendMap = revenueTrend.reduce((acc, row) => {
    acc[row._id] = row.total;
    return acc;
  }, {});

  const trendPoints = [];
  for (let i = 0; i < 30; i += 1) {
    const date = new Date(rangeStart);
    date.setDate(rangeStart.getDate() + i);
    const key = date.toISOString().slice(0, 10);
    trendPoints.push({
      date: key,
      revenue: trendMap[key] || 0,
    });
  }

  res.status(200).json({ revenueTrend: trendPoints, brandSales });
});

module.exports = {
  getDashboardStats,
  getAnalyticsReport,
};
