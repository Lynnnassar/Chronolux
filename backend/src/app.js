const express = require("express");
const path = require("path");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const config = require("./config/config");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const watchRoutes = require("./routes/watchRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const orderRoutes = require("./routes/orderRoutes");
const pageRoutes = require("./routes/pageRoutes");
const brandRoutes = require("./routes/brandRoutes");
const collectionRoutes = require("./routes/collectionRoutes");
const userRoutes = require("./routes/userRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const mediaRoutes = require("./routes/mediaRoutes");
const { notFound, errorHandler } = require("./middlewares/errorHandler");

const app = express();

// Static Media Serving
app.use("/media", express.static(path.join(__dirname, "../media")));

// Security Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use("/api/", limiter);

app.use("/api/auth", authRoutes);
app.use("/api/watches", watchRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/pages", pageRoutes);
app.use("/api/brands", brandRoutes);
app.use("/api/collections", collectionRoutes);
app.use("/api/users", userRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/media", mediaRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
