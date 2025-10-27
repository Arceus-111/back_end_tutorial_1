const cloudinary=require('../config/cloudinary')
const uploadToCloudinary = async(filepath) =>{
    try{
        const result = await cloudinary.uploader.upload(filepath);
        // const {url,public_id} = result;
        return {
            url : result.secure_url,
            publicId : result.public_id,
        }
        // return res.json({
        //     success : true,
        //     message : 'File uploaded suceessfully',
        //     url,
        //     public_id,
        // })
    }
    catch(e){
        console.log(`Error while uploading`,e);
        throw new Error(`Error while uploading`);
    }
}
module.exports=uploadToCloudinary;