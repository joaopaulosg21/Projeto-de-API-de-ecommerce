import cartService from "../../services/cartService.js";
import auth from "../auth.js";
const cart = new cartService()

class cartController{

    async createCart(req,res){
        const token = req.headers['authorization'].split(' ')[1]
        const user_id = auth.decoded(req,token)
        const {product_name,product_quantity} = req.body
        try{
            const response = await cart.create(product_name,product_quantity,user_id)
            return res.status(response.status).json(response.msg)
        }catch(error){
            console.log(error)
            return res.status(500).json(error)
        }
    }

    async viewCart(req,res){
        const token = req.headers['authorization'].split(' ')[1]
        const user_id = auth.decoded(req,token)
        try{
            const response = await cart.view(user_id)
            return res.status(response.status).json({msg:response.msg})
        }catch(error){
            return res.status(500).json(error)
        }
    }

    async deleteItem(req,res){
        const token = req.headers['authorization'].split(' ')[1]
        const user_id = auth.decoded(req,token)
        const {product_name} = req.body
        try{
            const response = await cart.deleteItem(product_name,user_id)
            return res.status(response.status).json({msg:response.msg})
        }catch(error){
            console.log(error)
            return res.status(500).json(error)
        }
    }

    async updateCart(req,res){
        const token = req.headers['authorization'].split(' ')[1]
        const user_id = auth.decoded(req,token)
        const {quantity} = req.body
        try{
            const response = await cart.update(user_id,req.params.id,quantity)
            return res.status(response.status).json({msg:response.msg})
        }catch(error){
            console.log(error)
            return res.status(500).json(error)
        }
    }
}

export default cartController