const db = require('../../db/connection.js');

const getUserCoordinates = async (req, res) => {
    if (req.session.userId) {
        const uid = req.session.userId;
        try {
            const [coord] = await db.query('select latitude,longitude from users where user_id=?', [uid]);
            if (coord.length === 0) {
                return res.status(400).json({ error: "Invalid user" });
            }
            // send Coordinates
            return res.status(200).json({ latitude: coord[0].latitude, longitude: coord[0].longitude, success: true });
        } catch (error) {
            return res.status(400).json({ error: "Server error" });
        }

    } else {
        return res.status(401).json({ error: "User not logged in" });
    }

}



module.exports = { getUserCoordinates };