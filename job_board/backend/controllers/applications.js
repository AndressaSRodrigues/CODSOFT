const {
    Application,
    create,
    findByQuery,
    deleteById
} = require('../models/applications');
const {
    sendConfirmationEmail,
    sendCVToCompany
} = require('../utils/nodemailer');

const sendApplication = async (req, res) => {
    try {
        const { userEmail, jobId, jobTitle, companyName, companyEmail } = req.body;

        if (!req.file || !req.file.buffer || req.file.buffer.length === 0) {
            return res.status(400).json({ message: 'Resume file is required.' });
        }

        const resumeBuffer = req.file.buffer;

        const newApplication = new Application({
            userEmail,
            jobId,
            jobTitle,
            resume: resumeBuffer,
            companyName,
            companyEmail,
        });

        const applicationDetails = `A new job application has been received from ${userEmail}. For the job ${jobTitle}: https://hirehub.vercel.app/job/${jobId}`;

        await create(newApplication);

        await sendConfirmationEmail(userEmail, companyName);

        await sendCVToCompany(companyEmail, resumeBuffer, applicationDetails);

        return res.status(201).json({ message: 'Application submitted successfully.', newApplication });
    } catch (error) {
        return res.status(500).json({ message: `${error}` });
    }
};

const getApplicationsByUser = async (req, res) => {
    try {
        const { userEmail } = req.params;

        const applications = await findByQuery({ userEmail });

        res.status(200).json({ applications });
    } catch (error) {
        return res.status(500).json({ message: `${error}` });
    }
};

const deleteApplicationByUser = async (req, res) => {
    try {
        const { id } = req.params;
        await deleteById(id);
        return res.status(200).json({ message: 'Application deleted.' })
    } catch (error) {
        return res.status(500).json({ message: `${error}` });
    }
};

module.exports = {
    sendApplication,
    getApplicationsByUser,
    deleteApplicationByUser
};
