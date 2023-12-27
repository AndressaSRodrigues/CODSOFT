const { getJobs, createJob, getJobsByCompany, getJobById, deleteJob, updateJob, getJobsByQuery } = require('../controllers/jobs');
const { isOwnJob } = require('../middleware/checkJobCompany');
const { isCompany } = require('../middleware/checkUserRole');

module.exports = (app) => {
    app.get('/jobs', getJobs);
    app.get('/jobs/:company', getJobsByCompany);
    app.get('/jobs/search/:query', getJobsByQuery);
    app.post('/jobs', isCompany, createJob);
    app.get('/job/:id', getJobById);
    app.delete('/job/:id', isOwnJob, deleteJob);
    app.patch('/job/:id', isOwnJob, updateJob);
};
