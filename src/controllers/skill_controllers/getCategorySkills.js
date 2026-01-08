const db = require('../../db/connection.js'); //connect to database

const getCatSkills = async (req, res) => {
    const cid = req.params.catId; //extract id from url
    const uid = req.session.userId;

    // const radius = req.body.radius;
    const radius = 3;
    try {
        const [userDetails] = await db.query('select longitude,latitude from users where user_id=?', [uid]);
        const latitude = userDetails[0].latitude;
        const longitude = userDetails[0].longitude;

        // get skills within given radius 
        const query = 'SELECT s.skill_id, s.name AS skill_name,s.cat_id, s.description,c.name, u.user_id,u.name AS user_name,u.phone,u.address, u.latitude, u.longitude, (6371 * ACOS(COS(RADIANS(?)) * COS(RADIANS(u.latitude)) * COS(RADIANS(u.longitude) - RADIANS(?)) +SIN(RADIANS(?)) * SIN(RADIANS(u.latitude)))) AS distance FROM skills s JOIN users u ON s.user_id = u.user_id join category c on s.cat_id=c.cat_id HAVING distance <= ? ORDER BY distance ASC;';
        const [skills] = await db.query(query, [latitude, longitude, latitude, radius]);

        // get skills belonging to particular category 
        const categorySkills = skills.filter(function (skill) {
            if (skill.cat_id === cid && skill.user_id != uid) {
                return true;
            }
        })

        return res.json({ message: 'done', skills: categorySkills, success: true });
    } catch (error) {
        console.log(error);
        return res.json({ message: 'server error' });
    }
}

module.exports = { getCatSkills };