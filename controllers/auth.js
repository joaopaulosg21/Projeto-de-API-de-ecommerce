import jsonwebtoken from "jsonwebtoken";
import config from "../config/config.js";

function login(user_id){
    try{
        const secret = config.secret
        const token = jsonwebtoken.sign({id:user_id},secret,{expiresIn:'1h'})
        return token
    }catch(error){
        throw new Error(error)
    }

}

export default login