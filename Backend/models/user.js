const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { type } = require('express/lib/response')
const { string } = require('zod')

const userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required: true,
            trim: true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true
        },
        password:{
            type:String,
            required:true,
            minlength:6
        },
        role: {
        type: String,
        enum: ["user","admin"],
        default: "user"
    }
    },
    
    {
timestamps: true
    }
);

//using pre for hash before save(password )
userSchema.pre('save',async function(next){
    if(!this.isModified('password'))return next();  //(like if name and email update and not password)

    this.password = await bcrypt.hash(this.password,10);
    next();
}) 

const User = mongoose.model('User', userSchema);
module.exports = User;