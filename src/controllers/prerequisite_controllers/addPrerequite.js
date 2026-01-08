const db = require("../../db/connection.js");

const addPrerequisite = async (req, res) => {
    const skillId = req.body.skillId;
    const description = (req.body.description).trim();

    if (!skillId || description === "") {
        return res.status(400).json({ message: "Incomplete information" });
    }
    try {
        await db.query('insert into prerequisites (skill_id,description) values (?,?)', [skillId, description]);
        return res.status(200).json({ success: true, message: "successfully added prerequisite" });
    } catch (err) {
        console.log(err);
        return res.status(400).json({ message: "Server error" });
    }
}

module.exports = { addPrerequisite }