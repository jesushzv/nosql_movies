const jwt = require('jsonwebtoken');
require('dotenv').config();

const authToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (authHeader) {
        const token = authHeader.split(' ')[1];

        if (token === 'null') {
            return res.status(401).json({
                message: 'Unauthorized'
            });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({
                    message: 'Auth failed'
                });
            }
            req.user = user;
            next();
        });
    } else {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
}

module.exports = authToken;