const express = require('express')
const {registerUser, loginUser} = require('../controllers/authController')
const auth = require('../middlewares/authMiddlewares.js')
const User = require('../models/user')
const authorizeRoles = require('../middlewares/roleMiddleware.js')
const router = express.Router()


router.post('/register',registerUser);
router.post('/login',loginUser)


//logged in can get own profile
router.get('/me',auth,(req,res)=>{
    res.json({
        id:req.user._id,
        name:req.user.name,
        email:req.user.email
    });
}) 

// this for admin only
router.get('/users',auth,authorizeRoles('admin'),async (req,res)=>{
    const users = await User.find().select('-password');
    res.json(users);
})


module.exports = router