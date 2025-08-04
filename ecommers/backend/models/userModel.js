import mongoose from "mongoose";

const repairSchema = new mongoose.Schema({
  productName: String,
  problemDescription: String,
  date: {
    type: Date,
    default: Date.now
  }
});

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require : true,
        unique: true
    },
    password:{
        type: String,
        require: true
    },
    cartData: {
        type: Object, default: {}
    },
    repair: {
        type: [repairSchema], // array of objects
        default: []
    }


},{minimize: false})

 

const userModel = mongoose.model.user || mongoose.model('user', userSchema);

export default userModel;