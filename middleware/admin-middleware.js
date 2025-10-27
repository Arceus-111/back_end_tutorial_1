const express = require('express')
const admin_middleware=async(req,res,next)=>{
    if(req.userInfo.role !== 'admin'){
        return res.status(404).json({
            success : false,
            message : 'Not an admin'
        })
    }
    return next();
}
module.exports=admin_middleware;