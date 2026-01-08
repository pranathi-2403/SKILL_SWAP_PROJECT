const db = require('../../db/connection.js');

const enrollParticipant = async (req, res) => {
    // get parameters
    const uid = req.session.userId;
    const classid = req.params.classId;

    // check if parameters are not null 
    if (!uid || !classid) {
        return res.json({ message: 'Invalid data' });
    }

    try {
        // check if user exists
        const [user] = await db.query('select name from users where user_id=?', [uid]);
        if (user.length === 0) {
            return res.json({ message: 'error' });
        }

        // check if class exists 
        const [classes] = await db.query('select skill_id from class_timings where class_id=?', [classid]);
        if (classes.length === 0) {
            return res.json({ message: 'error' });
        }

        // insert into database 
        await db.query('insert into participants (class_id,user_id) values (?,?)', [classid, uid]);
        return res.json({ message: 'skill added successfully', success: true });
    } catch (error) {
        console.log(error);
        if (error.code === 'ER_DUP_ENTRY') {
            return res.json({ message: 'You are already enrolled in this class', duplicate: error.code });
        }
        return res.json({ message: 'Server error' });
    }
}

module.exports = { enrollParticipant };