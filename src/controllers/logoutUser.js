const logout= (req, res) => {
    // Destroy the session
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.status(500).json({ error: 'Could not log out, please try again.' });
        }
        
        // Clear the cookie associated with the session
        res.clearCookie('connect.sid'); // Replace 'connect.sid' with your session cookie name if different

        // Send a success response or redirect the user to the login page
        res.status(200).json({ message: 'Successfully logged out.' });
    });
};

module.exports = {logout};
