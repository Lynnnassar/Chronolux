const jwt = require("jsonwebtoken");
const User = require("../models/User");
const config = require("../config/config");

const createToken = (userId) => {
  return jwt.sign({ id: userId }, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
  });
};

const register = async ({ fullName, email, password }) => {
  const existing = await User.findOne({ email });
  if (existing) {
    const error = new Error("Email already in use");
    error.statusCode = 400;
    throw error;
  }

  // Public registration always creates a customer account.
  const user = await User.create({
    fullName,
    email,
    password,
    role: "customer",
  });
  const token = createToken(user._id);
  return { user, token };
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error("Invalid credentials");
    error.statusCode = 401;
    throw error;
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    const error = new Error("Invalid credentials");
    error.statusCode = 401;
    throw error;
  }

  const token = createToken(user._id);
  return { user, token };
};

module.exports = { register, login };
