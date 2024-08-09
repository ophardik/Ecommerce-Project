const mongoose=require("mongoose");
const photoSchema=new mongoose.Schema({
    url:{
        type:"String",
        required:true,
        unique:true,
    },
});

const photoModel=mongoose.model("photo",photoSchema);

module.exports=photoModel;