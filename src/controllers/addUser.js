const db = require('../db/connection.js');
const bcryptjs = require('bcryptjs'); // module for password encryption

// function to signup new user 
const signupUser = async (req, res) => {
    // extracting contents from the req object 
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const password = req.body.password;
    const address = req.body.address;
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;

    // check if all input is available
    if (!name || !email || !phone || !password || !address || !latitude || !longitude) {
        return res.status(400).json({ error: 'Fill all details!' });
    }
    // check if name has atleast 3 characters
    else if (!name.match(/(?=.*[a-zA-Z0-9]{3,}).*$/g)) {
        return res.status(400).json({ error: 'Name should be at least 3 chars long' });
    }
    // email validation 
    else if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
        return res.status(400).json({ error: 'Invalid email' });
    }
    // phone number validation
    else if (!phone.match(/[0-9]{10}$/g)) {
        return res.status(400).json({ message: 'Invalid phone number' });
    }
    // check if password contains at least 8 characters and includes a special character 
    else if (!password.match(/^(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/)) {
        return res.status(400).json({ error: 'Invalid password... password must contain at least 8 characters and at least one special character' });
    }

    else {

        try {
            // check if email already exists 
            const [user] = await db.query('select * from users where email=?', [email]);
            if (user.length > 0) {
                return res.status(400).json({ error: 'email already registered' });
            }

            // password hashing
            const hashedPassword = await bcryptjs.hash(password, 10);

            // insert into database
            await db.query('insert into users (name,email,phone,password,address,latitude,longitude) values (?,?,?,?,?,?,?)', [name, email, phone, hashedPassword, address, latitude, longitude]);

            // return response with redirection
            return res.status(200).json({ success: true, redirect: "/views/signin.html" });

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });
        }
    }
}

// exporting the function
module.exports = { signupUser };