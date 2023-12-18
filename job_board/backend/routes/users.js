const { deleteUser, updateUser, getUser } = require("../controllers/users");
const isOwnUser = require("../middleware/checkUserLoggedIn");

module.exports = (app) => {
    app.get('/user/:email', isOwnUser, getUser);
    app.delete('/user/:email', isOwnUser, deleteUser);
    app.patch('/user/:email', isOwnUser, updateUser);
};
