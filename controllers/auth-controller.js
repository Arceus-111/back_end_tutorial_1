const express = require('express')
const bcrypt = require('bcrypt')
const User=require('../models/User')
const jwt=require('jsonwebtoken')
const registrUser=async(req,res) => {
    try{
        const {username,email,password,role} = req.body;  
        // if this user is already present 
        const alreadyexist = await User.findOne({
            $or:[
                {
                    username : req.body.username
                },
                {
                    email : req.body.email
                }
            ]
        })
        if(alreadyexist){
            return res.status(200).json({
                success : true,
                message : 'User already exists'
            })
        }
        const salt = 10;
        const hashpassword = await bcrypt.hash(password,salt);
        // create a new user and store in our database using model properties
        const newuser = await User.create(
        {
            username,
            email,
            password : hashpassword,
            role : role || 'user',
        });
        if(newuser){
            res.status(200).json({
                success : true,
                message : 'New user created successfully'
            })
        }
        else{
            res.status(404).json({
                success : false,
                message : 'Unable to create new user'
            })
        }

    }
    catch(e){
        res.status(404).json({
            success : false,
            message : "Some error occured while registering"
        })
    }
     
}
const loginuser = async(req,res)=>{
    try{
        const {username,password} =req.body;
        const isvalid = await User.findOne({username: req.body.username});
        if(!isvalid){
            res.status(404).json({
                success : false,
                message : 'username doesnot exist',
            })
        }
        const matchpassword = await bcrypt.compare(req.body.password,isvalid.password);
        if(!matchpassword){
            res.status(404).json({
                success : false,
                message : 'password does not match'
            })
        }
        // create a tokken using jwt module
        const SECRET_KEY="idk";
        const tokken = jwt.sign(
            {
                userId : isvalid._id,
                username : isvalid.username,
                role : isvalid.role
            },
            SECRET_KEY,
            {expiresIn:'1hr'}
        );
        // see the tokken
        // console.log(tokken);
        res.status(200).json({
            success : true,
            message : 'Logged in successfully',
            tokken,
        })
    }
    catch(e){
        res.status(404).json({
            success : false,
            message : 'something went wrong',
        })
    }
};
module.exports={registrUser,loginuser};
