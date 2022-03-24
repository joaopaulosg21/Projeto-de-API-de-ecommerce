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
                        return {status:201,msg:teste}
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

    async view(user_id){
        try{
            const cart = await this.collection.findOne({user_id:user_id,status:'pendente'})
            if(cart){
                return {status:200,msg:cart.items}
            }else{
                return {status:404,msg:`Você não possui nenhum carrinho`}
            }   
        }catch(error){
            throw new Error(error)
        }
    }

    async deleteItem(product_name,user_id){
        try{
            const product = await Product.findOne({name:product_name})
            const cart = await this.collection.findOne({user_id:user_id})
            if(cart){
                const items = cart.items 
                if(items.length == 0){
                    await this.collection.deleteOne({user_id:user_id})
                    return {status:404,msg:`Carrinho não existe ou item não está no carrinho`}
                }else{
                    for(let i = 0;i < items.length;i++){
                        if(items[i].product_name === product.name){
                            await cart.items[i].remove()
                            await cart.save()
                            return
                        }
                    }
                    return {status:200,msg:`Produto ${product_name} deletado do carrinho`}
                }
            }else{
                return {status:404,msg:`Carrinho não existe ou item não está no carrinho`}
            }
        }catch(error){
            throw new Error(error)
        }
    }

    async update(user_id,product_id,quantity){
        try{
            const cart = await this.collection.findOne({user_id:user_id})
            const product = await Product.findOne({_id:product_id})
            if(cart){
                const items = cart.items
                const item = items.filter((item)=>{
                    return item.name == product.product_name
                })
                cart.items.id(item[0]._id).product_quantity += quantity
                await cart.save()
                return {status:200, msg:`Produto ${product.name} atualizado nova quantidade ${cart.items.id(item[0]._id).product_quantity}`}
            }else{
                return {status:404,msg:`Carrinho não existe`}
            }
        }catch(error){
            throw new Error(error)
        }
    }

}

export default cartService