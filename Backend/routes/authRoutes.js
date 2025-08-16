const express = require('express')
const {registerUser, loginUser} = require('../controllers/authController')
const auth = require('../middlewares/authMiddlewares.js')
const {User} = require('../models/user')

const router = express.Router()


router.post('/register',registerUser);

router.post('/login',loginUser)

router.get('/me',auth,(req,res)=>{
    res.json({
        id:req.user._id,
        name:req.user.name,
        email:req.user.email
    });
}) 

module.exports = router