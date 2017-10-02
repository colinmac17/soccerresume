const express = require("express")
const router = express.Router();
const userRoutes = require("./user");
const authRoutes = require('./auth');

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
// set routes for other modesl
//router.use('/settings', settingsRoutes);

module.exports = router;