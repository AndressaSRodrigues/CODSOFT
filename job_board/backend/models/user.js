const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid.')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('You cannot have "password" as you password.')
            }
        }
    },
    age: {
        type: Number,
        validate(value) {
            if (value < 16) {
                throw new Error('You must be over 16 to join our platform.')
            }
        }
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = {
    User,
    UserSchema,
};