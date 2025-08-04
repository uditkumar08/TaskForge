const mongoose = require("mongoose");

const connectDB = async ()=>{
    try{
        const dbConnection  = await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB connected",dbConnection .connection.host);
        
    }
    catch(err){
        console.error(err.message);
        
    }
}

module.exports = connectDB