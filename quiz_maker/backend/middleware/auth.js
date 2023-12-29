const jwt = require('jsonwebtoken');
const { secretKey } = require('../config');

const extractToken = (req) => {
    const token = req.header('Authorization');

    if (!token || !token.startsWith('Bearer ')) {
        return null;
    }

    return token.split(' ')[1];
};

const checkUserAuth = () => {
    return (req, res, next) => {
        const tokenValue = extractToken(req);

        try {
            const { user, username } = jwt.verify(tokenValue, secretKey);

            if (!user || !username) {
                return res.status(403).json({ message: 'Forbidden: User or username information not found in token.' });
            }

            req.user = { user, username };
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token.' });
        }
    };
};

const userAuth = checkUserAuth();

module.exports = userAuth;