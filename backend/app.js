require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db");
const routes = require("./routes"); // Mengimpor index.js dari routes
const errorHandler = require("./middlewares/errorHandler");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Gunakan routes dengan prefix "/v1" (hanya satu kali pemanggilan)
app.use("/v1", routes);

// Root route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Node.js Prisma API" });
});

// Error handling middlewarez
app.use(errorHandler);

// Start server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();

module.exports = app;
