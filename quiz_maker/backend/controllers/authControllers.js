const { User, findByUsername } = require('../models/user');
const bcrypt = require('bcrypt');

const registerUser = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const isUserRegistered = await findByUsername(username);
        if (isUserRegistered) {
            return res.status(400).json({ message: 'Username already in use.' })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            password: hashedPassword,
        });

        await newUser.save();

        return res.status(201).json({ message: `New user created with the username ${newUser.username}` });
    } catch (error) {
        return res.status(500).json({ message: `${error}` });
    }
};

module.exports = { registerUser };