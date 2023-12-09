const { registerUser } = require("../controllers/auth");

module.exports = (app, next) => {
    app.post('/register', registerUser);

    app.get('/login', (req, res) => {
        res.send('Hello, login route!')
    });
};
