 import express from 'express';

 import { placeOrder, placeOrderRazorpay, placeOrderStripe, allOrders, userOrders, updateStatus, cancelOrder } from '../controllers/orderController.js';

 import authUser from '../middleware/auth.js';
import adminAuth from '../middleware/adminAuth.js';

const orderRouter = express.Router();


//Admin Features
orderRouter.post('/list', adminAuth, allOrders);
orderRouter.post('/status', adminAuth, updateStatus);
//Payment Features
orderRouter.post('/cancel',authUser, cancelOrder);
orderRouter.post('/place', authUser, placeOrder);
orderRouter.post('/stripe', authUser, placeOrderStripe);
orderRouter.post('/razorpay', authUser, placeOrderRazorpay);

//user Feature
orderRouter.post('/userorders', authUser, userOrders);

export default orderRouter;

