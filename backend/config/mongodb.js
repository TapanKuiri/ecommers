import mongoose from 'mongoose';

const connectDB = async () => {
  mongoose.connection.on('connected', () => {
    console.log('MongoDB connected');
  });
    await mongoose.connect(process.env.MONGODB_URI);

    

};

export default connectDB;


// import mongoose from "mongoose";

// const connectDB = async () => {
//   try {
//     mongoose.connection.on("connected", () => {
//       console.log("📌 MongoDB Connected Successfully");
//     });

//     mongoose.connection.on("error", (err) => {
//       console.log("❌ MongoDB Connection Error:", err.message);
//     });

//     await mongoose.connect(process.env.MONGODB_URI, {
//     });

//   } catch (error) {
//     console.log("❌ Failed to Connect MongoDB:", error.message);
//   }
// };

// export default connectDB;

 