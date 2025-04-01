const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    useName: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ["admin", "manager", "user"] },
  },
  {timestamps:true}
);


module.exports=mongoose.Model('User',userSchema)