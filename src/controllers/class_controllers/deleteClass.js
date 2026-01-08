const db = require('../../db/connection.js');

const deleteClass = async (req, res) => {
    const classId = req.params.classId;

    try {
        // check if class is valid 
        const [classes] = await db.query('select * from class_timings where class_id=?', [classId]);
        if (classes.length === 0) {
            return res.json({ message: 'class does not exist' });
        }

        // delete the class 
        await db.query('delete from class_timings where class_id=?', [classId]);
        return res.json({ message: 'deleted successfully', success: true });
    } catch (error) {
        console.log(error);
        return res.json({ message: 'Server error' });
    }
}

module.exports = { deleteClass };