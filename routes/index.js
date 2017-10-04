const path = require("path");
const express = require("express");
const router = express.Router();
const apiRoutes = require("./api");

// define our api routes
router.use("/api", apiRoutes);

module.exports = router;