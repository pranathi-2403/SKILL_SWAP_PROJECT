const db = require('../../db/connection.js')

const changeName = async (req, res) => {
    const uid = req.session.userId;
    const name = req.body.inputName;

    // check if session details are present 
    if (!uid) {
        console.log('not logged in!');
        return res.json({ message: 'not logged in!' });
    }

    // check if the name is at least 3 characters long 
    if (!name.match(/(?=.*[a-zA-Z0-9]{3,}).*$/g)) {
        return res.status(400).json({ error: 'Name should be at least 3 chars long' });
    }

    try {
        // change the name 
        await db.query('update users set name=? where user_id=?', [name, uid]);
        req.session.userName = name;
        return res.status(200).json({ message: 'successfully updated' });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'Server error' });
    }
}

module.exports = { changeName };