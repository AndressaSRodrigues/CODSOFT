const { User, findByUsername } = require('../models/user');
const { secretKey } = require('../config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const user = await findByUsername(username);
        if (!user) {
            return res.status(404).json({ message: 'User not found. Check your credentials.' })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password.' })
        }

        const token = jwt.sign({
            user: user,
            username: username,
        },
            secretKey,
            { expiresIn: '8h' }
        );

        return res.status(200).json({ token, user });
    } catch (error) {
        return res.status(500).json({ message: `${error}` });
    }
};

module.exports = { registerUser, login };