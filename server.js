require('dotenv').config();
const express = require('express');
const connectodb = require('./database/database')
const authRoutes=require('./routes/auth')
const homeRoutes = require('./routes/home')
const adminRoutes = require('./routes/admin')
const imageroute=require('./routes/image-route')
const app = express();
const PORT =  3000;
// connect to db
connectodb();
// middleware
app.use(express.json());

// app.use('/api/auth',); // u have to register urself
// app.use('/api/home',);
// app.use('/api/login',);
app.use('/api/auth',authRoutes);
app.use('/api/homes',homeRoutes);
app.use('/api/admin',adminRoutes);
app.use('/api/images',imageroute);
app.listen(PORT,()=>{
    console.log(`Server is running at port ${PORT}`)
})
