const { Application, create } = require('../models/applications');
const { sendConfirmationEmail, sendCVToCompany } = require('../utils/nodemailer');

const sendApplication = async (req, res) => {
    try {
        const { userEmail, jobId, companyEmail } = req.body;

        if (!req.file || !req.file.buffer || req.file.buffer.length === 0) {
            return res.status(400).json({ message: 'Resume file is required.' });
        }

        const resumeBuffer = req.file.buffer;

        console.log('resumeBuffer:', resumeBuffer);
        console.log(userEmail);

        const newApplication = new Application({
            userEmail,
            jobId,
            resume: resumeBuffer,
            companyEmail,
        });

        await create(newApplication);

        // Pass userEmail to the sendConfirmationEmail function
        await sendConfirmationEmail(userEmail);

        await sendCVToCompany(companyEmail, resumeBuffer);

        return res.status(201).json({ message: 'Application submitted successfully.', newApplication });
    } catch (error) {
        console.error('Error applying for job:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

module.exports = {
    sendApplication
};
