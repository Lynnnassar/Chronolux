const asyncHandler = require("../middlewares/asyncHandler");
const authService = require("../services/authService");

const register = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;
  const { user, token } = await authService.register({
    fullName,
    email,
    password,
  });

  res.status(201).json({
    token,
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    },
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { user, token } = await authService.login({ email, password });

  res.status(200).json({
    token,
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    },
  });
});

module.exports = { register, login };
