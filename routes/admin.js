const express = require('express')
const router = express.Router();
const middleware = require('../middleware/auth-middleware')
const admin_middleware = require('../middleware/admin-middleware')
router.get('/admin',middleware,admin_middleware,(req,res)=>{
    res.json({
        message : 'Welcome to admin page'
    })
}); // need to provide a controller 
module.exports=router;