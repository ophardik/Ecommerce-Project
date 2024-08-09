const mongoose=require("mongoose");

const productSchema=new mongoose.Schema({
  title:{
    type:String,
    required:true,
  },
  price:{
    type:Number,
    required:true,
  },
  description:{
    type:String,
    required:true,
  },
  category:{
    type:String,
    required:true,
  },
  url:{
    type:String,
    required:true,
  },
  is_active: {
    type: Boolean,
    default: true,
    required: true,
  },
  is_deleted: {
    type: Boolean,
    default: false,
    required: true,
  },
});

const productModel=mongoose.model("product",productSchema);

module.exports=productModel;