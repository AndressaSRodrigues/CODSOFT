const { User, findByEmail } = require('../models/user');
const bcrypt = require('bcrypt');

const registerUser = async (req, res, next) => {
    try {
        const { name, email, password, age } = req.body;

        const isUserRegistered = await findByEmail(email)
        if (isUserRegistered) {
            return res.status(400).json({ message: 'Email already in use.' })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            age
        });

        await newUser.save();

        return res.status(201).json({ message: 'User registered successfully.'})
    } catch (error) {
        return res.status(500).json({ message: `${error}` });
    }
};

module.exports = { registerUser }; 