const mongoose=require("mongoose");
// const bcrypt = require("bcrypt");
const signupSchema=new mongoose.Schema({

    userName:{
        type:"String",
        required:true,
        unique:true,
    },
    email:{
        type:"String",
        required:true,
        unique:true,
    },
    password:{
        type:"String",
        required: true ,
    },
    url:{
        type:"String",
    },
    is_active:{
        type : Boolean,
        default:"1"
    },
    is_deleted:{
        type:Boolean,
        default:"0"
    }


});


const signupModel=mongoose.model("signup",signupSchema);

module.exports=signupModel;
