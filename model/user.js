const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
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
  role: {
    type: String,
    required: true,
  }, 
  dob: {
    type: String,
    required:true,
  },
  loggedIn:{
    type:Boolean,
    required:true,
    default: true,
  }
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
