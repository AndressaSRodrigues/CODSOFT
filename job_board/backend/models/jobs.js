const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true,
    },
    level: {
        type: String,
        required: true,
        enum: ['Internship', 'Junior', 'Mid', 'Senior']
    },
    location: {
        type: String,
        required: true
    },
    modality: {
        type: String,
        enum: ['Remote', 'Hybrid', 'Office'],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    salary: {
        type: String,
        required: true
    },
    startDate: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Job = mongoose.model('Job', JobSchema);

async function find() {
    return Job.find({});
}

async function findById(id) {
    return Job.findById({ _id: id });
}

async function findByQuery(query = {}) {
    return Job.find(query).exec();
}

async function create(job) {
    return Job.create(job);
}

async function deleteById(id) {
    return Job.findOneAndDelete({ _id: id });
}

async function updateById(id, values) {
    return Job.findByIdAndUpdate(id, values, { new: true });
}

module.exports = {
    Job,
    find,
    findByQuery,
    findById,
    create,
    deleteById,
    updateById
};
