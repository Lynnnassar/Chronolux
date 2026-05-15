const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");
const validate = require("../middlewares/validateMiddleware");
const collectionValidation = require("../validations/collectionValidation");
const {
  getCollections,
  getCollectionById,
  createCollection,
  updateCollection,
  deleteCollection,
} = require("../controllers/collectionController");

const router = express.Router();

router.get("/", getCollections);
router.get(
  "/:id",
  validate(collectionValidation.getCollection),
  getCollectionById,
);
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  validate(collectionValidation.createCollection),
  createCollection,
);
router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  validate(collectionValidation.updateCollection),
  updateCollection,
);
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  validate(collectionValidation.getCollection),
  deleteCollection,
);

module.exports = router;
