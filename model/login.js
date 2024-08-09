const mongoose=require("mongoose");
const loginSchema=new mongoose.Schema({
    userName:{
        type:"String",
        required:true,
    },
    email:{
        type:"String",
        required:true,
        unique:true,
    },
    DOB:{
        type:"Date",
        required:true,
    },
    password:{
        type:"String",
        required: true ,
    },
    url:{
        type:"String",
        required:"true",
    },
    
    
    
});

const loginModel=new mongoose.model("users",loginSchema);

module.exports= loginModel;
