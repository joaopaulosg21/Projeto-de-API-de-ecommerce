import { Router } from "express";
import productController from "../controllers/products/productController.js";
import auth from '../controllers/auth.js'
const productRouter = Router()
const product = new productController()

productRouter.post('/add',auth.checkToken,auth.checkAdmin,product.createProduct)

productRouter.get('/',product.viewProducts)

productRouter.get('/:id',product.viewProduct)

export default productRouter