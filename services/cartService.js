import Cart from "../database/models/Cart.js";
import Product from "../database/models/Product.js";

class cartService{
    constructor(){
        this.collection = Cart
    }

    async create(product_name,product_quantity,user_id){
        try{
            const cart = await this.collection.findOne({user_id:user_id})
            const product = await Product.findOne({name:product_name})
            if(product){
                if(cart){
                    const response = cart.items.map(async(item)=>{
                        if(item.product_name == product.name){
                            return {msg:`Item já está no carrinho`}
                        }else{
                            cart.items.push({
                                product_name:product.name,
                                product_quantity:product_quantity,
                                product_id:product._id,
                                product_price:product.price
                            })
                            await cart.save()
                            return {msg:`Item cadastrado no carrinho`}
                        }
                    })
                    try{
                        const teste = await response[0]
                        return {status:200,msg:teste}
                    }catch(error){
                        throw new Error(error)
                    }    
                }else{
                    const product = await Product.findOne({name:product_name})
                    const newCart = await this.collection.create({user_id:user_id})
                    await newCart.items.push({
                        product_name:product.name,
                        product_quantity:product_quantity,
                        product_id:product._id,
                        product_price:product.price
                    })
                    await newCart.save()
                    return {status:201,msg:{msg:`Carrinho com o item ${product.name} criado`}}
                }
            }else{
                return {status:404,msg:{msg:`Esse produto não está cadastrado no sistema`}}
            }
        }catch(error){
            throw new Error(error)
        }
    }
}

export default cartService