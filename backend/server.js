const app = require("./src/app");
const config = require("./src/config/config");
const connectDB = require("./src/config/db");

const startServer = async () => {
  try {
    await connectDB();
    const PORT = config.port;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

startServer();
