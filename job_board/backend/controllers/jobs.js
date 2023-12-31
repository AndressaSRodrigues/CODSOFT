const { Job, find, create, findByQuery, findById, deleteById, updateById, findByCompany } = require("../models/jobs");

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
            createdBy: req.user.userId,
            companyEmail: req.user.email,
        });

        await create(newJob);
        return res.status(201).json({ message: 'Job successfully posted.', newJob });
    } catch (error) {
        return res.status(500).json({ message: `ta aqui a porra do erro ${error}`  });
    }
};

const getJobById = async (req, res) => {
    try {
        const { id } = req.params;
        const job = await findById(id);
        return res.status(200).json(job);
    } catch (error) {
        console.error('Error in getJobById:', error);
        return res.status(500).json({ message: `${error}` });
    }
};

const getJobsByCompany = async (req, res) => {
    try {
        const { company } = req.params;
        const jobs = await findByCompany({ createdBy: company });
        return res.status(200).json(jobs)
    } catch (error) {
        return res.status(500).json({ message: `${error}` });
    }
};

const getJobsByQuery = async (req, res) => {
    try {
        const { query: searchQuery } = req.params;
        const jobs = await findByQuery({ title: searchQuery });
        return res.status(200).json(jobs);
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

const deleteJob = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteJobById = await deleteById(id);

        if (!deleteJobById) {
            return res.status(404).json({ message: 'Job not found.' });
        }
        return res.status(200).json({ message: 'Job deleted.' })
    } catch (error) {
        return res.status(500).json({ message: `${error}` });
    }
};

const updateJob = async (req, res) => {
    try {
        const { id } = req.params;
        const values = req.body;
        
        const updatedJob = await updateById(id, values);

        if (!updatedJob) {
            return res.status(404).json({ message: 'Job not found.' });
        }

        return res.status(200).json(updatedJob)
    } catch (error) {
        return res.status(500).json({ message: `${error}` });
    }
};

module.exports = { getJobs, createJob, getJobsByCompany, getJobsByQuery, getJobById, deleteJob, updateJob };
