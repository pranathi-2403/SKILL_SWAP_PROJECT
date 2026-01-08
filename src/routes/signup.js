const express = require('express');

const router = express.Router();

const { signupUser } = require('../controllers/addUser.js');

// routes 
router.post('/', signupUser);

module.exports = router;