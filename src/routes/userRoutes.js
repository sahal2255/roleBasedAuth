const express=require('express')
const verifyToken=require('../middlewares/authMiddleware')
const autherizeRole=require('../middlewares/roleMiddleware')
const router=express.Router()
// only admin can access the router

router.get('/admin',verifyToken,autherizeRole('admin'),(req,res)=>{
    res.json({message:'Welcome Admin'})
})


// admin and manager can access this router

router.get('/manager',verifyToken,autherizeRole('admin','manager'),(req,res)=>{
    res.json({message:'Welcome Manager'})
})


// all can access this router

router.get('/user',verifyToken,autherizeRole('admin','manager','user'),(req,res)=>{
    res.json({message:'Welcome User'})
})


module.exports=router