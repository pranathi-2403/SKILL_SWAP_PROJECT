const db = require('../../db/connection.js')

const changeAddress = async (req, res) => {
    // get userId and new address
    const uid = req.session.userId;
    const address = req.body.inputAddress;
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;

    // check if session details are present 
    if (!uid) {
        console.log('not logged in!');
        return res.json({ message: 'not logged in!' });
    }

    try {
        // change the address 
        await db.query('update users set address=?,latitude=?,longitude=? where user_id=?', [address, latitude, longitude, uid]);
        return res.status(200).json({ message: 'successfully updated' });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'Server error' });
    }
}

module.exports = { changeAddress };