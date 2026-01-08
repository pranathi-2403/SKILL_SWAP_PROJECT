const db = require('../db/connection.js');

const getUser = (req, res) => {
    if (req.session.userName) {
        // send userName
        res.json({ userName: req.session.userName });
    } else {
        res.status(401).json({ error: "User not logged in" });
    }

}



module.exports = { getUser };