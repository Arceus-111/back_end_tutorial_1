const express = require('express')
const jwt = require('jsonwebtoken')
const app = express();
const middleware = async(req,res,next) => {
    // the tokken is given as req 
    const authheader = req.headers["authorization"]
    if(!authheader){
        return res.status(404).json({
            success : false,
            message : 'auth header nt found'
        })
    }
    const tokken = authheader && authheader.split(" ")[1];
    if(!tokken){
        return res.status(401).json({
            success : false,
            message : 'tokken not found'
        })
    }
    
    // 
    console.log(authheader);
    // now decode the tokken
    try{
        const decodedtokeninfo = jwt.verify(tokken,"idk");
        console.log(decodedtokeninfo);
        req.userInfo = decodedtokeninfo;
        return next();
    }
    catch(e){
        return res.status(404).json({
            success : false,
            message : 'something went wrong',
        })
    }
}
module.exports=middleware;