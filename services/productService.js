import Product from "../database/models/Product.js";
import utils from "../utils/utils.js";

class productService{
    constructor(){
        this.collection = Product
    }

    async create(product){
        const check = await utils.checkProduct(product)
        if(!check){
            return 
        }
        const productName = await this.collection.findOne({name:product.name})
        if(productName){
            return {status:404,msg:`Produto ja está cadastrado`}
        }else{
            try{
                await this.collection.create(product)
                return {status:201,msg:`Novo produto cadastrado ${product.name}`}
            }catch(error){
                throw new Error(error)
            }
        }
    }
    async view(){
        try{
            const response = await this.collection.find()
            return {status:200,msg:response}
        }catch(error){
            throw new Error(error)
        }
    }

    async viewProduct(id){
        try{
            const product = await this.collection.findById(id)
            if(product){
                return {status:200,msg:product}
            }else{
                return {status:404,msg:`Produto não existe`}
            }
        }catch(error){
            throw new Error(error)
        }
        

    }

}

export default productService