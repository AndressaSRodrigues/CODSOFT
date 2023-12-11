const { getJobs, createJob } = require('../controllers/jobs');
const { isCompany } = require('../middleware/userRole');

module.exports = (app) => {
    app.get('/jobs', getJobs);
    app.post('/jobs', isCompany, createJob);
};
