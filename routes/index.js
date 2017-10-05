const path = require("path");
const express = require("express");
const router = express.Router();
const apiRoutes = require("./api");

// define our api routes
router.use("/api", apiRoutes);

// what about react?!?!?!?
+router.use(function(req, res) {
    res.sendFile(
        path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;