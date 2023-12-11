const { Job, find, create } = require("../models/jobs");

const getJobs = async (req, res) => {
    try {
        const jobs = await find();
        return res.status(200).json(jobs);
    } catch (error) {
        return res.status(500).json({ message: `${error}` });
    }
};

const createJob = async (req, res) => {
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
