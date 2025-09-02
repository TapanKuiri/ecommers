import mongoose from "mongoose";

// Define the repair sub-schema
const serviceSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true, //  Ensure this field is not empty
    trim: true
  },
  problemDescription: {
    type: String,
    required: true, //  Ensure this field is not empty
    trim: true
  },
  date: {
    type: Date,
    default: Date.now
  }
}, { _id: false }); //  Prevent Mongoose from creating unnecessary _id for each repair entry

// Define the user schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,  
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true, //  Normalize email casing
    trim: true
  },
  image: {
    type: String,
    default: "" //  URL to user's profile picture
  },
  password: {
    type: String,
    required: true
  },
  cartData: {
    type: Map,
    of: Number,       //  Makes cartData more structured (e.g. { itemId: quantity })
    default: {}
  },
  service: {
    type: [serviceSchema], //  List of repair requests
    default: []
  }
}, {
  timestamps: true, //  Adds createdAt and updatedAt fields
  minimize: false   //  Keeps empty objects in DB
});

 
// Prevent OverwriteModelError in dev (especially with hot-reloading)
const userModel = mongoose.models.User || mongoose.model("User", userSchema);

export default userModel;
