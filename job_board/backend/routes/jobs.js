const { getJobs, createJob } = require('../controllers/jobs');
const { isCompany } = require('../middleware/jobs');

module.exports = (app) => {
    app.get('/jobs', getJobs);
    app.post('/jobs', isCompany, createJob);
};
