const Image = require('../models/image')
const uploadToCloudinary = require('../cloudinary-helper/cloudinary-helper')
const fs=require('fs')
const cloudinary = require('../config/cloudinary')
const uploadImage = async(req,res)=>{
    try{
        if(!req.file){
            return res.status(401).json({
                success : false,
                message : "File is required"
            });
        }
        const {url,publicId} = await uploadToCloudinary(req.file.path);
        // store it in database
        const newuploadedimage = new Image({
            url,
            publicId ,
            uploadedBy : req.userInfo.userId,
        });
        await newuploadedimage.save();
        res.status(200).json({
            success : true,
            message : "Image saved and uploaded successfully",
            image : newuploadedimage,
        })
    }
    catch(e){
        console.log(e);
        res.status(500).json({
            success : false,
            message : `Something went wrong while uploading the image`,
            error : e.message,
        })
    }
}
module.exports=uploadImage;
