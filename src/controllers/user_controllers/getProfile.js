const db = require('../../db/connection.js')

const getProfile = async (req, res) => {
    const uid = req.session.userId;
    // check if session details are present 
    if (!uid) {
        console.log('not logged in!');
        return res.json({ message: 'not logged in!' });
    }
    try {
        // get the details of the user 
        const rows = await db.query('select name,address,email,phone from users where user_id=?', [uid]);
        if (rows.length == 0) {
            return res.json({ message: 'user not found' })
        }

        const user = rows[0];
        return res.status(200).json({ message: 'successful', details: user[0] })
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'Server error' });
    }
}

module.exports = { getProfile };