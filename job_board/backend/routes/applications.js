const { sendApplication } = require('../controllers/applications');
const { isPerson } = require('../middleware/checkUserRole');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

module.exports = (app) => {
    app.post('/send', upload.single('resume'), sendApplication);
};
