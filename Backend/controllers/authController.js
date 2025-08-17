const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user.js')


 const registerUser = async (req,res)=>{
    try{
        const {name,email,password} = req.body;

        // already one
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(409).json({
                message: 'Email already in use'
            });
        }

        // new users
        const newUser = await User.create({name,email,password});

        res.status(201).json({
            message:'User registered successfully',
            user:{
                id:newUser._id,
                name:newUser.name,
                email:newUser.email
            }
        });

    } catch(err){
        res.status(500).json({
            message:"Server error",err:err.message
        })
    }
}

const generateToken = (user) => {
    return jwt.sign(
        {id:user._id, role: user.role},process.env.JWT_SECRET , {
       expiresIn: '7d'
    })
}



 const loginUser = async (req,res) => {
    const {email , password} = req.body

    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({
                message:"Invalid credentials"
            });
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(401).json({
                message:"Invalid credentials"
            });
        }

        const token = generateToken(user._id);

        res.status(200).json({
            message: " Login Successful",
            token,
            user:{
                id:user._id,
                name:user.name,
                email:user.email
            }
        });

    }catch(error){
         res.status(500).json({ message: 'Server error', error: error.message });
    }
}


module.exports = { registerUser, loginUser };
