import { Router } from "express";
import userController from "../controllers/users/userController.js";
const userRouter = Router();
const user = new userController();

userRouter.post('/add',user.createUser)

userRouter.get('/',user.viewUsers)

userRouter.post('/login',user.loginUser)

export default userRouter;