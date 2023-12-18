const jwt = require('jsonwebtoken');
const { secretKey } = require('../config');
const { extractToken } = require('../utils/token');

const checkUserEmail = () => {
    return (req, res, next) => {
        const tokenValue = extractToken(req);

        try {
            const { user, email } = jwt.verify(tokenValue, secretKey);

            if (!user || !email) {
                return res.status(403).json({ message: 'Forbidden: User or email information not found in token.' });
            }

            const userEmail = email;

            const requestedEmail = req.params.email;

            if (userEmail === requestedEmail) {
                req.user = { user, email };
                next();
            } else {
                return res.status(403).json({ message: 'Forbidden: Unauthorized access.' });
            }
        } catch (error) {
            return res.status(500).json({ message: `${error}` });
        }
    };
};

const isOwnUser = checkUserEmail();

module.exports = isOwnUser;
