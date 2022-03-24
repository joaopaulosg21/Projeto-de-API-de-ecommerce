import { Router } from "express";
import cartController from "../controllers/cart/cartController.js";
import auth from '../controllers/auth.js'
const cartRouter = Router()
const cart = new cartController()

cartRouter.post('/new',auth.checkToken,cart.createCart)

cartRouter.get('/view',auth.checkToken,cart.viewCart)

cartRouter.post('/deleteItem',auth.checkToken,cart.deleteItem)

cartRouter.post('/updateCart/:id',auth.checkToken,cart.updateCart)

export default cartRouter