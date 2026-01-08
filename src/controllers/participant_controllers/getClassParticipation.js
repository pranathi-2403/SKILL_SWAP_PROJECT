const db = require('../../db/connection.js');

const getClassParticipation = async (req, res) => {
    const classId = req.params.classId;

    try {
        // get class id's of the classes the user is participating in 
        const [participants] = await db.query('select name,phone,address from users where user_id in (select user_id from participants where class_id=?)', [classId]);

        return res.json({ message: 'successful', participants: participants });
    } catch (error) {
        console.log(error);
        return res.json({ message: 'Server error' });
    }
}

module.exports = { getClassParticipation };