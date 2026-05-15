const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");
const validate = require("../middlewares/validateMiddleware");
const orderValidation = require("../validations/orderValidation");
const {
  placeOrder,
  getMyOrders,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
} = require("../controllers/orderController");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  validate(orderValidation.placeOrder),
  placeOrder,
);
router.get("/my-orders", authMiddleware, getMyOrders);
router.get("/", authMiddleware, adminMiddleware, getAllOrders);
router.get(
  "/:id",
  authMiddleware,
  adminMiddleware,
  validate(orderValidation.getOrder),
  getOrderById,
);
router.put(
  "/:id/status",
  authMiddleware,
  adminMiddleware,
  validate(orderValidation.updateStatus),
  updateOrderStatus,
);

module.exports = router;
