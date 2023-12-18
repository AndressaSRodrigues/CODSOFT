const { deleteUser } = require("../controllers/users");
const isOwnUser = require("../middleware/checkUserLoggedIn");

module.exports = (app) => {
    app.delete('/user/:email', isOwnUser, deleteUser);
};
