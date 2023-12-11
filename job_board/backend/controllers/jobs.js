const { Job, create } = require("../models/jobs");

const getJobs = (req, res) => {
    res.send('List of jobs');
};

const createJob = async (req, res, next) => {
    try {
        const {
            title,
            company,
            level,
            description,
            salary,
            startDate
        } = req.body;

        const newJob = new Job({
            title,
            company,
            level,
            description,
            salary,
            startDate
        });

        await create(newJob);
        return res.status(201).json({ message: 'Job successfully posted.' });
    } catch (error) {
        return res.status(500).json({ message: `${error}` });
    }
};

module.exports = { getJobs, createJob };
