const { getJobs, createJob, getJobsByCompany, getJobById, deleteJob, updateJob } = require('../controllers/jobs');
const { isOwnJob } = require('../middleware/checkJobCompany');
const { isCompany } = require('../middleware/checkUserRole');

module.exports = (app) => {
    app.get('/jobs', getJobs);
    app.get('/jobs/:company', getJobsByCompany);
    app.post('/job', isCompany, createJob);
    app.get('/job/:id', getJobById);
    app.delete('/job/:id', isOwnJob, deleteJob);
    app.patch('/job/:id', isOwnJob, updateJob);
};
