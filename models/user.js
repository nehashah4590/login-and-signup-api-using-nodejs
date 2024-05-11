const mongoose = require("mongoose");

//Schema
const registerUser = new mongoose.Schema({
    name:{
      type:String,
      required:true,
    },
    username:{
      type:String,
      required:true,
      unique:true,
    },
    email:{
      type:String,
      required:true,
      unique:true,
    },
    number:{
      type:String,
      required:true,
      unique:true,
    },
    password:{
      type:String,
      required:true,
    },
  },{timestamps:true});
  
  const User = mongoose.model("user", registerUser);

  module.exports = User; 