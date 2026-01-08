const db = require('../../db/connection.js')
const bcryptjs = require('bcryptjs');

const changePassword = async (req, res) => {
    const uid = req.session.userId;
    const password = req.body.inputPassword;
    const currentPassword = req.body.inputCurrentPassword;

    // check if session details are present 
    if (!uid) {
        console.log('not logged in!');
        return res.json({ message: 'not logged in!' });
    }

    try {
        // get password 
        const [rows] = await db.query("select password from users where user_id=?", [uid]);
        if (rows.length === 0) {
            return res.status(400).json({ error: "Some error occured" });
        }

        // get hashedPassword 
        let hashedPassword = rows[0].password;

        // check if input password and hashedPassword matches
        const isMatch = await bcryptjs.compare(currentPassword, hashedPassword);

        if (!isMatch) {
            return res.status(400).json({ error: 'incorrect password' })
        }

        // check if new password matches the password constraints
        if (!password.match(/^(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/)) {
            return res.status(400).json({ error: 'Invalid password... password must contain at least 8 characters and at least one special character' });
        }

        // password hashing
        const newPassword = await bcryptjs.hash(password, 10);

        // update the password
        await db.query('update users set password=? where user_id=?', [newPassword, uid]);
        return res.status(200).json({ message: 'successfully updated' });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'Server error' });
    }
}

module.exports = { changePassword };