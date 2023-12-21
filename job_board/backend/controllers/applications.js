const { Application, create } = require('../models/applications')

const sendApplication = async (req, res) => {
    try {
        const { userId, jobId, companyEmail } = req.body;

        if (!req.file || !req.file.buffer || req.file.buffer.length === 0) {
            return res.status(400).json({ message: 'Resume file is required.' });
        }

        const resumeBuffer = req.file.buffer;

        console.log('resumeBuffer:', resumeBuffer);

        const newApplication = new Application({
            userId,
            jobId,
            resume: resumeBuffer,
            companyEmail,
        });

        await create(newApplication);

        return res.status(201).json({ message: 'Application submitted successfully.', newApplication });
    } catch (error) {
        console.error('Error applying for job:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

module.exports = {
    sendApplication
};