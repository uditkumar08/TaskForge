const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { type } = require('express/lib/response')
const { string } = require('zod')

const userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            trim:true
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
        }
    },
    {
    timeStamps:true
    }
);

//using pre for hash before save
userSchema.pre('save',async function(next){
    if(!this.isModified('password'))return next();

    this.password = await bcrypt.hash(this.password,10);
    next();
})

const User = mongoose.model('User', userSchema);
export default User;