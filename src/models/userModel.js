const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ["admin", "manager", "user"] },
  },
  {timestamps:true}
);


const User=mongoose.model('User',userSchema)
module.exports = User