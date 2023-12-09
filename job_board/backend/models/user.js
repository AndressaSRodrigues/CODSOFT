const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    role: {
        type: String,
        enum: ['person', 'company']
    },
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
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        trim: true,
    },
    age: {
        type: Number,
    }
});

const User = mongoose.model('User', UserSchema);

async function find() {
    return User.find({});
}

async function findByEmail(email) {
    return User.findOne({ email });
}

async function deleteByEmail(email) {
    return User.findOneAndDelete({ email });
}

async function updateByEmail(email, values) {
    return User.findOneAndUpdate({ email }, values, { new: true });
}

module.exports = {
    User,
    UserSchema,
    find,
    findByEmail,
    deleteByEmail,
    updateByEmail
};