const { getJobs, createJob, getJobsByCompany, getJobById, deleteJob, updateJob } = require('../controllers/jobs');
const { isCompany } = require('../middleware/userRole');

module.exports = (app) => {
    app.get('/jobs', getJobs);
    app.post('/jobs', isCompany, createJob);
    app.get('/jobs/:company', getJobsByCompany);
    app.get('/job/:id', getJobById); {/* different route to avoid conflict */}
    app.delete('/job/:id', isCompany, deleteJob);
    app.patch('/job/:id', isCompany, updateJob);
};
