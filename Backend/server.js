 require('dotenv').config();
const connectDB = require('./config/db');
const app = require("./app")



const PORT = process.env.PORT || 5000
// console.log("ok");

connectDB()
const taskRoutes = require('./routes/taskRoutes');
app.use('/api/tasks', taskRoutes);

app.listen(PORT , () => {
    console.log(`Server running on port ${PORT}`);
    
});