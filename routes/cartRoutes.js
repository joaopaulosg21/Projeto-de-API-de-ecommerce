import { Router } from "express";
import cartController from "../controllers/cart/cartController.js";
import auth from '../controllers/auth.js'
const cartRouter = Router()
const cart = new cartController()

cartRouter.post('/new',auth.checkToken,cart.createCart)

export default cartRouter