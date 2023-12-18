const extractToken = (req) => {
    const token = req.header('Authorization');

    if (!token || !token.startsWith('Bearer ')) {
        return null;
    }

    return token.split(' ')[1];
};

module.exports = { extractToken };