const jwt = require('jsonwebtoken');
const User = require('../models/user.js');

// Authentication Middleware
const auth = async (req, res, next) => {
    try {
  
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'No token, authorization denied' });
        }

        const token = authHeader.split(' ')[1];

        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            return res.status(401).json({ message: 'User not found or inactive' });
        }

        req.user = user;

        
        next();

    } catch (error) {
        console.error('Auth Middleware Error:', error.message);
        res.status(401).json({ message: 'Token is not valid' });   
    }
};

module.exports = auth;
