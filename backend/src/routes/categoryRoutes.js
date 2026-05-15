const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");
const validate = require("../middlewares/validateMiddleware");
const categoryValidation = require("../validations/categoryValidation");
const {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const router = express.Router();

router.get("/", getCategories);
router.get("/:id", validate(categoryValidation.getCategory), getCategoryById);
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  validate(categoryValidation.createCategory),
  createCategory,
);
router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  validate(categoryValidation.updateCategory),
  updateCategory,
);
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  validate(categoryValidation.getCategory),
  deleteCategory,
);

module.exports = router;
