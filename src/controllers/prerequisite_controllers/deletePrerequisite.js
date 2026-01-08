const db = require('../../db/connection.js');

const deletePrerequisite = async (req, res) => {
    const pid = req.params.pid;

    if (!pid) {
        return res.status(400).json({ message: "Unsuccessful" });
    }

    try {
        await db.query('delete from prerequisites where p_id=?', [pid]);
        return res.status(200).json({ success: true, message: "Successfully deleted prerequisite" });
    } catch (err) {
        console.log(err);
        return res.status(400).json({ message: "Server error" });
    }
}

module.exports = { deletePrerequisite };