const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true,
        enum: ['internship', 'junior', 'mid', 'senior']
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
    }
});

const Job = mongoose.model('Job', JobSchema);

async function find() {
    return Job.find({});
}

async function findById(id) {
    return Job.findById({ _id: id });
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
    find,
    findById,
    create,
    deleteById,
    updateById
};
