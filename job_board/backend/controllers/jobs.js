const { Job, find, create, findByQuery, findById } = require("../models/jobs");

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
            location,
            modality,
            description,
            salary,
            startDate,
        } = req.body;

        const newJob = new Job({
            title,
            company,
            level,
            location,
            modality,
            description,
            salary,
            startDate,
            createdBy: req.user.userId
        });

        await create(newJob);
        return res.status(201).json({ message: 'Job successfully posted.', newJob });
    } catch (error) {
        return res.status(500).json({ message: `${error}` });
    }
};

const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await findById(jobId);
        return res.status(200).json(job);
    } catch (error) {
        console.error('Error in getJobById:', error);
        return res.status(500).json({ message: `${error}` });
    }
};


const getJobsByCompany = async (req, res) => {
    try {
        const companyId = req.params.company;
        const jobs = await findByQuery({ createdBy: companyId });
        return res.status(200).json(jobs)
    } catch (error) {
        return res.status(500).json({ message: `${error}` });
    }
};

module.exports = { getJobs, createJob, getJobsByCompany, getJobById };
