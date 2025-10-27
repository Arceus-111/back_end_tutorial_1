const express = require('express')
const middleware=require('../middleware/auth-middleware')
const router = express.Router();
// getting into home page
router.get('/home',middleware,(req,res)=>{
    const {username,userId,role} = req.userInfo;
    res.status(200).json({
        message : "Welcome to home page",
        user : {
            _id : userId,
            username : username,
            role : role,
        }
    })
});
 // controller function (middleware) for accessing of home
module.exports= router;
// post req
