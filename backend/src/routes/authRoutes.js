const express = require("express");
const { register, login } = require("../controllers/authController");
const validate = require("../middlewares/validateMiddleware");
const authValidation = require("../validations/authValidation");

const router = express.Router();

router.post("/register", validate(authValidation.register), register);
router.post("/login", validate(authValidation.login), login);

module.exports = router;
