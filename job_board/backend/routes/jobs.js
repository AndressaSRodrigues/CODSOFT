const { getJobs, createJob, getJobsByCompany } = require('../controllers/jobs');
const { isCompany } = require('../middleware/userRole');

module.exports = (app) => {
    app.get('/jobs', getJobs);
    app.get('/jobs/:id', getJobsByCompany);
    app.post('/jobs', isCompany, createJob);
};
