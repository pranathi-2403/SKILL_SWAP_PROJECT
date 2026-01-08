const express = require('express');

const router = express.Router();

const { userLogin } = require('../controllers/loginUser.js');

router.post('/', userLogin);

module.exports = router;