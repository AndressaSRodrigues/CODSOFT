const { registerUser, login } = require('../controllers/authControllers');

module.exports = (app, next) => {
    app.post('/register', registerUser);
    app.post('/login', login);
};
