import userService from "../../services/userService.js";
import auth from "../auth.js";
const user = new userService();

class userController{

    async createUser(req,res){     
        try{
            const response = await user.create(req.body)
            return res.status(response.status).json(response.msg)
        }catch(error){
            return res.status(500).json(error)
        }
    }

    async viewUsers(req,res){
        try{
            const response = await user.view()
            return res.status(response.status).json(response.msg)
        }catch(error){
            return res.status(500).json(error)
        }
    }

    async loginUser(req,res){
        try{
            const response = await user.login(req.body)
            return res.status(response.status).json({msg:response.msg})
        }catch(error){
            return res.status(500).json(error)
        }
    }

    async newAddress(req,res){
        const token = req.headers['authorization'].split(' ')[1]
        const user_id = auth.decoded(req,token)
        try{
            const response = await user.address(req.body,user_id)
            return res.status(response.status).json({msg:response.msg})
        }catch(error){
            return res.status(500).json(error)
        }
    }
}

export default userController;