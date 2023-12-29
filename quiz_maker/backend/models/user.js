const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
});

const User = mongoose.model('User', UserSchema);

async function findUsers() {
    return User.find({});
}

async function findByUsername(username) {
    return User.findOne({ username });
}

async function deleteByUsername(username) {
    return User.findOneAndDelete({ username });
}

async function updateByUsername(username, values) {
    return User.findOneAndUpdate({ username }, values, { new: true });
}

module.exports = {
    User,
    findUsers,
    findByUsername,
    deleteByUsername,
    updateByUsername
};
