const asyncHandler = require("../middlewares/asyncHandler");
const User = require("../models/User");

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({ role: "customer" })
    .select("-password")
    .sort({ createdAt: -1 });
  res.status(200).json(users);
});

const deleteUser = asyncHandler(async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "User deleted" });
});

module.exports = {
  getUsers,
  deleteUser,
};
