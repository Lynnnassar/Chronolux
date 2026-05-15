const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");
const validate = require("../middlewares/validateMiddleware");
const brandValidation = require("../validations/brandValidation");
const {
  getBrands,
  getBrandById,
  createBrand,
  updateBrand,
  deleteBrand,
} = require("../controllers/brandController");
const upload = require("../middlewares/uploadMiddleware");

const router = express.Router();

router.get("/", getBrands);
router.get("/:id", validate(brandValidation.getBrand), getBrandById);
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  upload.single("brandImage"),
  validate(brandValidation.createBrand),
  createBrand,
);
router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  upload.single("brandImage"),
  validate(brandValidation.updateBrand),
  updateBrand,
);
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  validate(brandValidation.getBrand),
  deleteBrand,
);

module.exports = router;
