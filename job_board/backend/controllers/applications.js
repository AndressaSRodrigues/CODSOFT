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

        const applicationDetails = `A new job application has been received from ${userEmail}. For the job http://localhost:5173/job/${jobId}`;

        await create(newApplication);

        await sendConfirmationEmail(userEmail, companyEmail);

        await sendCVToCompany(companyEmail, resumeBuffer, applicationDetails);

        return res.status(201).json({ message: 'Application submitted successfully.', newApplication });
    } catch (error) {
        console.error('Error applying for job:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

module.exports = {
    sendApplication
};
