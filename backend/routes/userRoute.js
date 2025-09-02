import express from 'express'
import { loginUser, registerUser, adminLogin, googleLogin, totalUser } from '../controllers/userController.js'

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/admin', adminLogin);
userRouter.post('/google', googleLogin);
userRouter.get('/total', totalUser);
// userRouter.post('/role', userRole);

export default userRouter;