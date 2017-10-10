const express = require("express")
const router = express.Router();
const userRoutes = require("./user");
const authRoutes = require("./auth");
const academicRoutes = require("./academic");

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/academic', academicRoutes);
// set routes for other modesl
//router.use('/settings', settingsRoutes);

module.exports = router;