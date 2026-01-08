const db = require('../../db/connection.js');

const getPrerequisite = async (req, res) => {
    const sid = req.params.skillId;

    if (!sid) {
        return res.status(400).json({ message: "Unsuccessful" });
    }

    try {
        const [prerequisites] = await db.query('select p_id,description from prerequisites where skill_id=?', [sid]);
        if (prerequisites.length === 0) {
            return res.status(200).json({ success: true, message: "No prerequisites found", prerequisites: [] });
        }
        return res.status(200).json({ success: true, message: "Successful", prerequisites: prerequisites });
    } catch (err) {
        console.log(err);
        return res.status(400).json({ message: "Server error" });
    }
}

module.exports = { getPrerequisite };