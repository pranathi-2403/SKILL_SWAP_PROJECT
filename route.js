const express = require('express');
const path = require('path'); // Import path module
const app = express(); // express instance

// import routes 
const signupRoute = require('./src/routes/signup.js');
const loginRoute = require('./src/routes/login.js');
const logoutRoute = require('./src/routes/logout.js');
const skillRoute = require('./src/routes/skill.js');
const classRoute = require('./src/routes/class.js');
const participantRoute = require('./src/routes/participant.js');
const getUserRoute = require('./src/routes/getUserDetails.js');
const notificationRoute = require('./src/routes/notifications.js');
const prerequisiteRoute = require('./src/routes/prerequisites.js');

app.use(express.static(path.join(__dirname, '/public')))

// use routes
app.use('/signup', signupRoute);
app.use('/login', loginRoute);
app.use('/logout', logoutRoute);
app.use('/skill', skillRoute);
app.use('/class', classRoute);
app.use('/participant', participantRoute);
app.use('/getUser', getUserRoute);
app.use('/notifications', notificationRoute);
app.use('/prerequisite', prerequisiteRoute);

// middleware for error handling
app.use((req, res) => {
    res.status(404).json({ message: 'Page not found' });
});

// export express instance 
module.exports = app;