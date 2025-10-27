const express = require('express')
const router = express.Router();
const middleware=require('../middleware/auth-middleware');
const admin_middleware=require('../middleware/admin-middleware');
const uploadImage=require('../controllers/image-controller')
const imagemiddleware = require('../middleware/image-middleware')
// to upload an image 
router.post('/upload',middleware,admin_middleware,imagemiddleware.single("image"),uploadImage); // controller fucntion
module.exports=router;