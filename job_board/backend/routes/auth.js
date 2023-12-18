const { registerUser, loginUser } = require("../controllers/auth");

module.exports = (app, next) => {
    app.post('/register', registerUser);
    app.post('/login', loginUser);
};
