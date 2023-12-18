const jwt = require('jsonwebtoken');
const { secretKey } = require('../config');
const { extractToken } = require('../utils/token');

const checkUserRole = (allowedRole) => {
    return (req, res, next) => {
        const tokenValue = extractToken(req);

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
            return res.status(500).json({ message: `${error}` });
        }
    };
};

const isCompany = checkUserRole('company');
const isPerson = checkUserRole('person');

module.exports = { isCompany, isPerson };
