const express = require('express');

const router = express.Router();

const { logout } = require('../controllers/logoutUser.js');

router.get('/', logout);

module.exports = router;