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

function checkToken(req,res,next){
    const secret = config.secret
    if(req.headers['authorization']){
        const token = req.headers['authorization'].split(' ')[1]
        try{
            const decoded = jsonwebtoken.verify(token,secret)
            if(decoded){
                next()
            }
        }catch(error){
            return res.status(400).json({msg:`Token invalido`})
        }
    }else{
        return res.status(400).json({msg:`Você não está logado`})
    }
}

function decoded(req,token){
    const secret = config.secret
    if(req.headers['authorization']){
        try{
            const decoded = jsonwebtoken.verify(token,secret)
            if(decoded){
                return decoded.id
            }
        }catch(error){
            return `Token invalido`
        }

    }

}

export default {login,checkToken,decoded}