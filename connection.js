const mongoose=require("mongoose");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

async function connectToMongoDB(url){
  return mongoose.connect(url);
}

module.exports={
    connectToMongoDB,
};
