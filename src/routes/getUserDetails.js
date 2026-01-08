const express = require('express');

const router = express.Router();

const { getUser } = require('../controllers/getUser.js');
const { getProfile } = require('../controllers/user_controllers/getProfile.js');
const { changeName } = require('../controllers/user_controllers/changeName.js');
const { changePhone } = require('../controllers/user_controllers/changePhone.js');
const { changeAddress } = require('../controllers/user_controllers/changeAddress.js');
const { changePassword } = require('../controllers/user_controllers/changePassword.js');
const { getUserCoordinates } = require('../controllers/user_controllers/getUserCoordinates.js');

router.get('/profile', getProfile);
router.get('/coordinates', getUserCoordinates);
router.get('/', getUser);

router.put('/name', changeName);
router.put('/phone', changePhone);
router.put('/address', changeAddress);
router.put('/password', changePassword);

module.exports = router;