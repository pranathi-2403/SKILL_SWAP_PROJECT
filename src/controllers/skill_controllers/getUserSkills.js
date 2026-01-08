const db = require('../../db/connection.js');

const getUserSkills = async (req, res) => {
    const uid = req.session.userId; // get user_id
    try {
        // get the skills of the respective user 
        const [skills] = await db.query('select * from skills where user_id=?', [uid]);
        if (skills.length === 0) {
            return res.json({ message: 'No skills found' });
        }
        return res.json({ skills: skills });
    } catch (error) {
        console.log(error);
        return res.json({ message: 'Server error' });
    }
}

module.exports = { getUserSkills };