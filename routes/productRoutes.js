import { Router } from "express";
import productController from "../controllers/products/productController.js";
const productRouter = Router()
const product = new productController()

productRouter.post('/add',product.createProduct)

productRouter.get('/',product.viewProducts)

export default productRouter