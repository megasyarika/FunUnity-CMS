const express = require("express");
const createUserRoutes = require("./authRoutes");
const loginRoutes = require("./authRoutes");

const router = express.Router();

// kumpulan routes
router.use("/", createUserRoutes);
router.use("/", loginRoutes);

module.exports = router;
