const jwt = require('jsonwebtoken');
const { secretKey } = require('../config');
const { findById } = require('../models/jobs');

const isOwnJob = async (req, res, next) => {
    const token = req.header('Authorization');

    if (!token || !token.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token format.' });
    }

    const tokenValue = token.split(' ')[1];

    try {
        const { userId } = jwt.verify(tokenValue, secretKey);

        if (!userId) {
            return res.status(403).json({ message: 'Forbidden: User information not found in token.' });
        }

        const jobId = req.params.id;

        const job = await findById(jobId);

        if (!job) {
            return res.status(404).json({ message: 'Job not found.' });
        }

        if (userId === job.createdBy.toString()) {
            req.user = { userId };
            next();
        } else {
            return res.status(403).json({ message: 'Forbidden: Unauthorized access to the job.' });
        }
    } catch (error) {
        return res.status(500).json({ message: `${error}` });
    }
};

module.exports = { isOwnJob };
