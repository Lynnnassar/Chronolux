const express = require("express");
const { getHomePage } = require("../controllers/pageController");

const router = express.Router();

router.get("/home", getHomePage);

module.exports = router;
