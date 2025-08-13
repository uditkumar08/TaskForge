const express = require('express')
const {registerUser, loginUser} = require('../controllers/authController')
const {auth} = require('../middlewares/authMiddlewares.js')
const router = express.Router()


router.post('/register',registerUser);

router.post('/login',loginUser)

router.get('/me',auth,async(req,res)=>{
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
}) 

module.exports = router