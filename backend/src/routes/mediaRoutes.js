const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");
const { listMedia, deleteMedia } = require("../controllers/mediaController");

const router = express.Router();

router.get("/", authMiddleware, adminMiddleware, listMedia);
router.post("/delete", authMiddleware, adminMiddleware, deleteMedia);

module.exports = router;
