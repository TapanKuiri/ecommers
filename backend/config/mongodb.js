import mongoose from 'mongoose';

const connectDB = async () => {
  mongoose.connection.on('connected', () => {
    console.log('MongoDB connected');
  });
        // mongodb+srv://<db_username>:<db_password>@cluster0.8fguxtc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

    //  await mongoose.connect('mongodb+srv://tapan-user:new123@cluster0.8fguxtc.mongodb.net/e-commerce');
    // await mongoose.connect('mongodb://localhost:27017/e-commerce');
    await mongoose.connect(process.env.MONGODB_URI);

    

};

export default connectDB;
