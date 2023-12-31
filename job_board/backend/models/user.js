const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true,
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
        trim: true,
    },
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