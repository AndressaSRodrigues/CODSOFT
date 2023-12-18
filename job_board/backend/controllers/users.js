const bcrypt = require('bcrypt');
const { deleteByEmail, updateByEmail, findByEmail } = require('../models/user');

const getUser = async (req, res) => {
    const { email } = req.params;

    try {
        const user = await findByEmail(email);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: `${error}` });
    }
};

const deleteUser = async (req, res) => {
    const { email } = req.params;

    try {
        const deletedUser = await deleteByEmail(email);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: `${error}` });
    }
};

const updateUser = async (req, res) => {
    const { email } = req.params;
    const values = req.body;

    if (values.password) {
        values.password = bcrypt.hashSync(values.password, 10);
    }

    try {
        const updatedUser = await updateByEmail(email, values);
        return res.status(200).json(updatedUser);
    } catch (error) {
        return res.status(500).json({ message: `${error}` });
    }
};

module.exports = {
    deleteUser,
    updateUser,
    getUser
};
