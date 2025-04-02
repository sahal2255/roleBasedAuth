const User=require('../models/userModel')
const bcrypt=require('bcryptjs')
const jwt = require('jsonwebtoken')


const register=async(req,res)=>{
    const {userName,password,role}=req.body
    console.log('userName',userName)
    try {
        const user=await User.findOne({userName})
        if(user){
            console.log('user already exist')
            return res.status(409).json({message:"User already exists"})
        }
        const hashedPassword=await bcrypt.hash(password,10);
        console.log('password hashed',hashedPassword)
        const newUser=new User({
            userName,
            password:hashedPassword,
            role
        })


        newUser.save()
        console.log('new user created',newUser)
        res.status(201).json({message:'User Registerd Successfully'})
    } catch (error) {
        console.log('error in the user register function',error)
        res.status(500).json({message:'Something Went Wrong'})
    }
}

const login=async(req,res)=>{
    const {userName,password}=req.body
    try {
        const User=await User.findOne({userName})
        if(!User){
            console.log('User not found')
            res.status(404).json({message:'User Not found'})
        }
        const isMatch=await bcrypt.compare(password,User.password)
        if(!isMatch){
            console.log('User password is not matched')
            res.status(404).json({message:'Invalid Credentials'})
        }
        const token = jwt.sign(
            {id:User._id,role:User.role},
            process.env.JWT_SECRET,
            {expiresIn:"1h"}
        )

        res.status(200).json({message:'User logged in successfully',token})
    } catch (error) {
        console.log('error in the user login function',error)
        res.status(500).json({message:'Internal Server error'})
    }
}


module.exports={
    register,
    login,
}