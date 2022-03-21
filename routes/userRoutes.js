import { Router } from "express";
import userController from "../controllers/users/userController.js";
import auth from '../controllers/auth.js'
const userRouter = Router();
const user = new userController();

userRouter.post('/add',user.createUser)

userRouter.get('/',user.viewUsers)

userRouter.post('/login',user.loginUser)

userRouter.post('/newAddress',auth.checkToken,user.newAddress)

export default userRouter;