const mongoose = require('mongoose');
const { Job } = require('./jobs');

const ApplicationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    date: {
        type: Date,
        default: Date.now
    },
    jobId: {
        type: String,
    },
    resume: {
        type: Buffer,
        required: true
    },
    companyEmail: {
        type: String,
    },
});

const Application = mongoose.model('Application', ApplicationSchema);

async function findByQuery(query = {}) {
    return Application.find(query).exec();
}

async function create(jobApplication) {
    return Application.create(jobApplication);
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
