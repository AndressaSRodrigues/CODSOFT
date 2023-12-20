const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    resume: {
        type: String,
        required: true
    },
    companyEmail: {
        type: String,
        required: true,
    },
});

const Application = mongoose.model('Application', ApplicationSchema);

async function findByQuery(query = {}) {
    return Application.find(query).exec();
}

async function create(job) {
    return Application.create(job);
}

async function deleteById(id) {
    return Application.findOneAndDelete({ _id: id });
}

module.exports = {
    Application,
    findByQuery,
    create,
    deleteById
};
