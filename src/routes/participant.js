const express = require('express');
const router = express.Router();

const { enrollParticipant } = require('../controllers/participant_controllers/enroll_participant.js');
const { getParticipatingClasses } = require('../controllers/participant_controllers/getUserParticipation.js');
const { deleteParticipant } = require('../controllers/participant_controllers/delete_participant.js');
const { getClassParticipation } = require('../controllers/participant_controllers/getClassParticipation.js');

router.post('/:classId', enrollParticipant);
router.get('/class/:classId', getClassParticipation);
router.get('/', getParticipatingClasses);
router.delete('/:classId', deleteParticipant)

module.exports = router;