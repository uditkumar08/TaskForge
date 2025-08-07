const User = require('../models/user.js')

export const registerUser = async (req,res)=>{
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