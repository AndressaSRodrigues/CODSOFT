const { deleteByEmail } = require('../models/user');

const deleteUser =  async (req, res) => {
    const { email } = req.params;

    try {
        const deletedUser = await deleteByEmail(email);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    deleteUser
};
