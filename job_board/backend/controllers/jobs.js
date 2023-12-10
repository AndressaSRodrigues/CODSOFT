const getJobs = (req, res) => {
    res.send('List of jobs');
};

const createJob = (req, res) => {
    res.send('Job created successfully');
};

module.exports = { getJobs, createJob };
