const db = require('../../db/connection.js');

const getSkillClasses = async (req, res) => {
    const skillId = req.params.skillId;
    try {
        // get class timings of a skill
        const [classes] = await db.query('select s.name,c.start_time,c.end_time,c.date,c.class_id from class_timings c join skills s on s.skill_id=c.skill_id where s.skill_id=?', [skillId])
        if (classes.length === 0) {
            return res.json({ message: 'No classes of the specified skill found', classes: [] });
        }
        return res.json({ message: 'successful', classes: classes });
    } catch (error) {
        console.log(error);
        return res.json({ message: 'Server error' });
    }
}

module.exports = { getSkillClasses };