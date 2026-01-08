const db = require('../../db/connection.js');

const deleteParticipant = async (req, res) => {
    // get userId and classId from session and parameters respectively
    const uid = req.session.userId;
    const cid = req.params.classId;

    try {
        // delete the participant from the class 
        await db.query('delete from participants where user_id=? and class_id=?', [uid, cid]);
        return res.json({ message: 'successful' });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'Server error' });
    }
}

module.exports = { deleteParticipant };