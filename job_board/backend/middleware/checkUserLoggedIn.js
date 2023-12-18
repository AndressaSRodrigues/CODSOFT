const jwt = require('jsonwebtoken');
const { secretKey } = require('../config');

const checkUserEmail = () => {
    return (req, res, next) => {
        const token = req.header('Authorization');

        if (!token || !token.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token format.' });
        }

        const tokenValue = token.split(' ')[1];

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
            console.error('Token verification error:', error);
            return res.status(401).json({ message: 'Unauthorized: Invalid token.' });
        }
    };
};

const isOwnUser = checkUserEmail();

module.exports = isOwnUser;
