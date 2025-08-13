const jwt = require('jsonwebtoken')
const User = require('../models/user.js')


const auth = async (req,res,next) =>{
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(401).json({ message: 'No token, authorization denied' });
    }
}

const token = authHeader.split(' ')[1];

try{
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    req.user = {
        id:decoded.id,
        role: decoded.role
    }

    next();
} catch(err){
     return res.status(401).json({ message: 'Token is not valid' });
}


module.exports = auth;