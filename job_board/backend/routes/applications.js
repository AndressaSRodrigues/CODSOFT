const { sendApplication, getApplicationsByUser, deleteApplicationByUser } = require('../controllers/applications');
const { isPerson } = require('../middleware/checkUserRole');
const { isOwnUser } = require('../middleware/checkUserEmail');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

module.exports = (app) => {
    app.post('/applications', isPerson, upload.single('resume'), sendApplication);
    app.get('/applications/:userEmail', getApplicationsByUser);
    app.delete('/application/:id', deleteApplicationByUser);
};
