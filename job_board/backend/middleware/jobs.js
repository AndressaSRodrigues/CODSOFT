const jwt = require('jsonwebtoken');
const { secretKey } = require('../config');

const checkUserRole = (allowedRole) => {
    return (req, res, next) => {
        const token = req.header('Authorization');

        if (!token || !token.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token format.' });
        }

        const tokenValue = token.split(' ')[1];

        try {
            const decoded = jwt.verify(tokenValue, secretKey);

            if (!decoded || !decoded.role) {
                return res.status(403).json({ message: 'Forbidden: Role information not found in token.' });
            }

            const userRole = decoded.role;

            if (userRole === allowedRole) {
                req.user = decoded;
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

const isCompany = checkUserRole('company');
const isPerson = checkUserRole('person');

module.exports = { isCompany, isPerson };
