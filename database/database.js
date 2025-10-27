const mongoose = require('mongoose');
const connectodb= async()=>{
    try{
        await mongoose.connect('mongodb+srv://kalitadebashish19:kalitadebashish19@cluster0.tan4fuh.mongodb.net/')
        console.log(`Mongodb connected successfully`);
    }
    catch(e){
        console.log(`Mongodb connection failed`);
        process.exit(1);
    }
}
module.exports=connectodb;