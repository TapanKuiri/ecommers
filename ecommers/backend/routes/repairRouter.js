// repairRoute.js
import express from 'express';
import  {placeRepair, listRepair}  from '../controllers/repairController.js';
import authUser from '../middleware/auth.js';

const repairRouter = express.Router();

repairRouter.post('/add',authUser, placeRepair);
repairRouter.post('/list', authUser, listRepair);

export default repairRouter;
