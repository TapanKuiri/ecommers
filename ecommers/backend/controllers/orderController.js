import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";


// placing order using COD Method
const placeOrder = async (req, res) =>{
     try{
          const {userId, items, amount, address} = req.body;

          const orderData = {
               userId,
               items,
               address,
               amount,
               paymentMethod: 'COD',
               payment:false,
               date: Date.now()
          }

          const newOrder = new orderModel(orderData);
          // console.log("newOrder: ",newOrder)
          await newOrder.save();

          await  userModel.findByIdAndUpdate(userId, {cartData:{}});

          res.json({success: true, message: "Order Placed"})



     }catch(err){
          console.log(err)
          res.json({success: false, message: err.message});
     }
}


// placing order using Stripe  Method
const placeOrderStripe = async (req, res) =>{
    
}


// placing order using Razorpay Method
const placeOrderRazorpay = async (req, res) =>{
    
}

// placing order data for Admin Panel
const allOrders = async (req, res) =>{
     try{
          const orders = await orderModel.find({});
          res.json({success: true, orders});
     }catch(err){
          console.log(err);
          res.json({success: false, message: err.message});
     }
}

//User Order Data For Frontend
const userOrders = async (req, res) =>{
    try{

          const {userId} = req.body;
      
          const orders = await orderModel.find({userId});
          console.log("orders", orders);
          res.json({success:true, orders});
     }catch(err){
          console.log(err);
          res.json({success: false, message: err.message});
     }
}

//update order status from admin panel
const updateStatus = async (req, res) =>{
    try{  
     const {orderId, status} = req.body;
     await orderModel.findByIdAndUpdate(orderId, {status});
     res.json({success:true, message:'Status Updated'})

    }catch(err){
        console.lod(err);
        res.json({success: false, message: err.message});
    }
}

export {placeOrder, placeOrderStripe, placeOrderRazorpay,
     allOrders, userOrders, updateStatus} 