const express = require('express');
const router = express.Router();

const { getPrerequisite } = require('../controllers/prerequisite_controllers/getPrerequisites');
const { addPrerequisite } = require('../controllers/prerequisite_controllers/addPrerequite');
const { deletePrerequisite } = require('../controllers/prerequisite_controllers/deletePrerequisite');

router.get('/:skillId', getPrerequisite);
router.post('/', addPrerequisite);
router.delete('/:pid', deletePrerequisite);

module.exports = router;