const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");
const validate = require("../middlewares/validateMiddleware");
const watchValidation = require("../validations/watchValidation");
const {
  getWatches,
  getWatchById,
  createWatch,
  updateWatch,
  deleteWatch,
} = require("../controllers/watchController");
const upload = require("../middlewares/uploadMiddleware");

const router = express.Router();

router.get("/", getWatches);
router.get("/:id", validate(watchValidation.getWatch), getWatchById);
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  upload.single("watchImage"),
  validate(watchValidation.createWatch),
  createWatch,
);
router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  upload.single("watchImage"),
  validate(watchValidation.updateWatch),
  updateWatch,
);
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  validate(watchValidation.getWatch),
  deleteWatch,
);

module.exports = router;
