import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js'; 
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
// import repairRouter from './routes/repairRoute.js';
import repairRouter from './routes/repairRouter.js';


// App Confirguration
const app = express();
const PORT = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// Middleware
app.use(express.json());
app.use(cors());

app.use('/api/user', userRouter); 
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);
app.use('/api/repair', repairRouter);

app.get('/', (req, res)=>{
    res.send("API Working");
})

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})