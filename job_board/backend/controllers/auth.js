const { User, findByEmail } = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { secretKey } = require('../config');

const registerUser = async (req, res, next) => {
    try {
        const { role, name, email, password, age } = req.body;

        const isUserRegistered = await findByEmail(email)
        if (isUserRegistered) {
            return res.status(400).json({ message: 'Email already in use.' })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            role,
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

const loginUser = async (req, res, next) => {
    try{
        const { email, password } = req.body;

        const user = await findByEmail(email);
        if (!user){
            return res.status(401).json({ message: 'User not registered.'})
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password.'})
        }

        const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '5h' });
        res.status(200).json({ token, user });
    } catch (error) {
        return res.status(500).json({ message: `${error}`});
    }
};

module.exports = { registerUser, loginUser };