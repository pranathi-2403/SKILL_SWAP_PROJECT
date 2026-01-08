const db = require('../../db/connection.js')

const changePhone = async (req, res) => {
    const uid = req.session.userId;
    const phone = req.body.inputPhone;

    // check if session details are present 
    if (!uid) {
        console.log('not logged in!');
        return res.json({ message: 'not logged in!' });
    }

    // check if new phone number is valid 
    if (!phone.match(/[0-9]{10}$/g)) {
        return res.status(400).json({ error: 'Invalid phone number' });
    }

    try {
        // update the new phone number 
        await db.query('update users set phone=? where user_id=?', [phone, uid]);
        return res.status(200).json({ message: 'successfully updated' });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'Server error' });
    }
}

module.exports = { changePhone };