const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");
const { getDashboardStats, getAnalyticsReport } = require("../controllers/analyticsController");

const router = express.Router();

router.get("/dashboard", authMiddleware, adminMiddleware, getDashboardStats);
router.get("/report", authMiddleware, adminMiddleware, getAnalyticsReport);

module.exports = router;
