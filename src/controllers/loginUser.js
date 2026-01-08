const db = require('../db/connection.js');
const bcryptjs = require('bcryptjs'); // module for password encryption
const path = require('path');

// function for user login 
const userLogin = async (req, res) => {
    // extract email and password from req object 
    const email = req.body.email;
    const password = req.body.password;

    // check if email and password are entered 
    if (!email || !password) {
        return res.status(400).json({ error: "Fill all details" });
    } else {
        try {
            // verify email 
            const [rows] = await db.query("select user_id,name,password from users where email=?", [email]);
            if (rows.length === 0) {
                return res.status(400).json({ error: "Invalid email or password" });
            }

            // get hashedPassword 
            let hashedPassword = rows[0].password;

            // check if input password and hashedPassword matches
            const isMatch = await bcryptjs.compare(password, hashedPassword);

            if (isMatch) {
                req.session.userId = rows[0].user_id;
                req.session.userName = rows[0].name;
                return res.status(200).json({ success: true, redirect: '/views/home_page.html' });
            } else {
                return res.status(400).json({ error: "Invalid email or password" });
            }

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });
        }
    }

}

// export function
module.exports = { userLogin };




