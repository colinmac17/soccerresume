const express = require("express")
const router = express.Router();
const userRoutes = require("./user");
const authRoutes = require("./auth");
const academicRoutes = require("./academic");
const athleticRoutes = require("./athletic");
const mediaRoutes = require('./media');
const contactRoutes = require('./contact');
const settingsRoutes = require('./settings');

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/academic', academicRoutes);
router.use('/athletic', athleticRoutes);
router.use('/media', mediaRoutes);
router.use('/contact', contactRoutes);
router.use('/settings', settingsRoutes);
// set routes for other modesl
//router.use('/settings', settingsRoutes);

module.exports = router;