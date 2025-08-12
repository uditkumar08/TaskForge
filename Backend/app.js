const express = require('express')
const cors = require("cors")
const dotenv = require('dotenv')
const authRoutes = require('./routes/authRoutes.js');

dotenv.config()

const app  = express()


app.use(cors())
app.use(express.json())




app.get("/",(req,res) => {
    res.json({
        message:"Believe Udit"
    })
});
app.use('/api/auth',authRoutes)
app.use((req, res) => {
  res.status(404).json({ message: 'Resource not found' });
});



module.exports = app;