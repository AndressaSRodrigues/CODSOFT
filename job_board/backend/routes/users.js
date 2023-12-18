const { deleteUser, updateUser } = require("../controllers/users");
const isOwnUser = require("../middleware/checkUserLoggedIn");

module.exports = (app) => {
    app.delete('/user/:email', isOwnUser, deleteUser);
    app.patch('/user/update/:email', isOwnUser, updateUser);
};
