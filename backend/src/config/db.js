const mongoose = require("mongoose");
const config = require("./config");

const connectDB = async () => {
  await mongoose.connect(config.mongoose.url);
  console.log("MongoDB connected");
};

module.exports = connectDB;
