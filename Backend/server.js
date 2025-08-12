 require('dotenv').config();
const connectDB = require('./config/db');
const app = require("./app")



const PORT = process.env.PORT || 5000
// console.log("ok");

connectDB()
app.listen(PORT , () => {
    console.log(`Server running on port ${PORT}`);
    
});