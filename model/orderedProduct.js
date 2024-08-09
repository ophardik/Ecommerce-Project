const mongoose=require("mongoose");
const orderedSchema=new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    productName:{
        type:String,
        required:true,
    },
    productPrice:{
        type:Number,
        required:true,

    },
    productUrl:{
        type:String,
        required:true,

    },
})

const orderedProduct=mongoose.model("orderedProduct",orderedSchema);

module.exports=orderedProduct;