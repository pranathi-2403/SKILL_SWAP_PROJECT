const db = require('../../db/connection.js');

const getUserClasses = async (req, res) => {
    const user = req.session.userId;
    try {
        // get classes the user is teaching
        const [classes] = await db.query('select s.name,c.start_time,c.end_time,c.date from class_timings c join skills s on s.skill_id=c.skill_id where user_id=?', [user])
        if (classes.length === 0) {
            return res.json({ message: 'No classes of the specified user found', classes: [] });
        }
        return res.json({ message: 'successful', classes: classes });
    } catch (error) {
        console.log(error);
        return res.json({ message: 'Server error' });
    }
}

module.exports = { getUserClasses };