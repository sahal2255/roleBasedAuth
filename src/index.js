const express=require('express')
const dotenv=require('dotenv').config()
const dbConnect =require('./config/dbConnect')
const app=express()
const authRoute=require('./routes/authRoutes')
dbConnect()
app.use(express.json())

app.use('/api',authRoute)

const PORT=process.env.PORT || 7002
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})