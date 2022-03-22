import productService from "../../services/productService.js";
const product = new productService()

class productController{

    async createProduct(req,res){
        try{
            const response = await product.create(req.body)
            return res.status(response.status).json(response.msg)
        }catch(error){
            res.status(500).json(error)
        }
    }
    
    async viewProducts(req,res){
        try{
            const response = await product.view()
            return res.status(response.status).json(response.msg)
        }catch(error){
            res.status(500).json(error)
        }
    }

    async viewProduct(req,res){
        try{
            const response = await product.viewProduct(req.params.id)
            return res.status(response.status).json(response.msg)
        }catch(error){
            return res.status(500).json(error)
        }
    }
}

export default productController