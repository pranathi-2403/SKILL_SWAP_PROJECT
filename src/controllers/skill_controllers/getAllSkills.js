const db = require('../../db/connection.js');


const getSkills = async (req, res) => {
    const uid = req.session.userId;
    const radius = 3;

    try {
        // get latitude and longitude of user 
        const [userDetails] = await db.query('select longitude,latitude from users where user_id=?', [uid]);
        if (userDetails.length === 0) {
            return res.status(400).json({ status: 'error', message: 'Latitude and longitude are required' });
        }
        const latitude = userDetails[0].latitude;
        const longitude = userDetails[0].longitude;

        // query to get skills from database
        const query = 'SELECT s.skill_id, s.name AS skill_name, s.description, u.user_id, u.latitude, u.longitude, (6371 * ACOS(COS(RADIANS(?)) * COS(RADIANS(u.latitude)) * COS(RADIANS(u.longitude) - RADIANS(?)) +SIN(RADIANS(?)) * SIN(RADIANS(u.latitude)))) AS distance FROM skills s JOIN users u ON s.user_id = u.user_id where u.user_id!=? HAVING distance <= ? ORDER BY distance ASC;';
        const [skills] = await db.query(query, [latitude, longitude, latitude, uid, radius]);

        // check if skills were found within the given radius 
        if (skills.length === 0) {
            return res.status(200).json({ success: true, status: 'success', message: 'no skills found within the given range', skills: skills });
        } else {
            return res.status(200).json({ success: true, status: 'success', message: 'successful', skills: skills });
        }


    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'error', message: 'server error' });
    }
}

module.exports = { getSkills };
