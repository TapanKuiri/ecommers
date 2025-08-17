// repairRoute.js
import express from 'express';
import  {placeService, listService, cancelService, statusService}  from '../controllers/serviceController.js';
import authUser from '../middleware/auth.js';

const serviceRouter = express.Router();

serviceRouter.post('/add',authUser, placeService);
serviceRouter.post('/list', authUser, listService);
serviceRouter.post('/cancel', authUser, cancelService);
serviceRouter.post('/status', authUser, statusService);



export default serviceRouter;
