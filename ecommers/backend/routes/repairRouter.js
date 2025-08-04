// repairRoute.js
import express from 'express';
import  {productData}  from '../controllers/repairController.js';
import authUser from '../middleware/auth.js';

const repairRouter = express.Router();

repairRouter.post('/add',authUser, productData);

export default repairRouter;
