const express = require('express');
const router = express.Router();

const { sendClassNotificationsForToday } = require('../controllers/sendNotifications');

router.get('/',sendClassNotificationsForToday)

module.exports = router;