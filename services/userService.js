import User from "../database/models/User.js";
import utils from "../utils/utils.js";
import auth from "../controllers/auth.js";

class userService {
    constructor(){
        this.collection = User
    }

    async create(user){
        const check = await utils.checkUser(user)
        if(!check){
            return 
        }
        const username = await this.collection.findOne({username:user.username})
        if(username){
            return {status:400,msg:`Esse username ja está cadastrado`}
        }else{
            try{
                await this.collection.create(user)
                return {status:201,msg:`Novo usuario cadastrado ${user.name}`}
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

    async login(user){
        try{
            const result = await this.collection.findOne({username:user.username,password:user.password})
            if(result){
                const token = auth.login(result._id)
                await this.collection.findByIdAndUpdate({_id:result._id},{token:token})
                return {status:200,msg:`Usuario logado ${token}`}
            }else{
                return {status:200,msg:`Username ou password incorretos`}
            }
        }catch(error){
            throw new Error(error)
        }
    }
    //Adiciona um novo endereço
    async address(address,user_id){
        const check = await utils.checkAdress(address);
        if(!check){
            return
        }
        try{
            const user = await this.collection.findOne({_id:user_id})
            user.address.push({city:address.city,state:address.state,country:address.country})
            user.save()
            return {status:200,msg:`Novo endereço adicionado`}
        }catch(error){
            throw new Error(error)
        }

    }

    
}

export default userService