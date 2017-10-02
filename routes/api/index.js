const express = require("express")
const router = express.Router();
const userRoutes = require("./user");

router.use('/users', userRoutes);
// set routes for other modesl
//router.use('/settings', settingsRoutes);

module.exports = router;