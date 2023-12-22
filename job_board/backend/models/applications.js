const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
    userEmail: {
        type: String,
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
    date: {
        type: Date,
        default: Date.now
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
