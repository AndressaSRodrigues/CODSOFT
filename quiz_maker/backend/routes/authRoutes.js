const { registerUser } = require('../controllers/authControllers');

module.exports = (app, next) => {
    app.post('/register', registerUser);
};
