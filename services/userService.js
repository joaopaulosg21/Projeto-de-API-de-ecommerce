import User from "../database/models/User.js";
import checkUser from "../utils/utils.js";
import login from "../controllers/auth.js";

class userService {
    constructor(){
        this.collection = User
    }

    async create(user){
        const verify = await checkUser(user)
        if(!verify){
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
                const token = login(result._id)
                await this.collection.findByIdAndUpdate({_id:result._id},{token:token})
                return {status:200,msg:`Usuario logado ${token}`}
            }else{
                return {status:200,msg:`Username ou password incorretos`}
            }
        }catch(error){
            throw new Error(error)
        }
    }
}

export default userService