const db = require('../../db/connection.js');

const addClass = async (req, res) => {
    const skillId = req.body.skillId;
    const start = req.body.startTime;
    const end = req.body.endTime;
    const date = req.body.date;

    // check if input timings are valid
    if (end <= start) {
        return res.json({ message: 'Invalid timings' });
    }

    try {
        // get userid of the class being added
        const [user] = await db.query('select user_id from skills where skill_id=?', [skillId]);
        const uid = user[0].user_id;
        // get all skills that the user is engaging
        const [skills] = await db.query('select skill_id from skills where user_id=?', [uid]);
        const skillIds = skills.map(skill => skill.skill_id);

        // query to check if there are any clashes 
        const clashCheckQuery = `
            SELECT * FROM class_timings 
            WHERE skill_id IN (?) AND date = ?
            AND (
                (start_time < ? AND end_time > ?) OR
                (start_time < ? AND end_time > ?) OR
                (start_time >= ? AND end_time <= ?)
            )
        `;

        const [clashResult] = await db.query(clashCheckQuery, [
            skillIds,
            date,
            end, start,
            start, end,
            start, end
        ]);

        // check if clash has occured
        if (clashResult.length > 0) {
            return res.json({ message: 'The timings clash with an existing class', clashedClasses: clashResult });
        }

        // insert timings into database
        const insertQuery = `
            INSERT INTO class_timings (skill_id, start_time, end_time, date)
            VALUES (?, ?, ?, ?)
        `;
        await db.query(insertQuery, [skillId, start, end, date]);
        const [id] = await db.query('select class_id from class_timings where skill_id=? and start_time=? and end_time=? and date=?', [skillId, start, end, date])

        // Return success response
        return res.status(201).json({ message: 'Class added successfully.', success: true, id: id[0] });

    } catch (error) {
        console.log(error);
        return res.json({ message: 'Server error' });
    }

}

module.exports = { addClass };