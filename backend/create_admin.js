const mongoose = require("mongoose");
const User = require("./src/models/User");
const config = require("./src/config/config");
require("dotenv").config();

const createAdmin = async () => {
  try {
    await mongoose.connect(config.mongoose.url);
    console.log("Connected to MongoDB");

    const adminEmail = process.env.ADMIN_EMAIL || "admin@chronolux.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "AdminPassword123!";
    
    const existing = await User.findOne({ email: adminEmail });

    if (existing) {
      console.log("Admin already exists. Updating role to admin...");
      existing.role = "admin";
      await existing.save();
      console.log("Admin updated successfully.");
    } else {
      console.log("Creating new super admin...");
      await User.create({
        fullName: "Super Admin",
        email: adminEmail,
        password: adminPassword,
        role: "admin",
      });
      console.log("Admin created successfully.");
    }

    process.exit(0);
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
};

createAdmin();
