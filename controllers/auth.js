import jsonwebtoken from "jsonwebtoken";
import config from "../config/config.js";
import User from "../database/models/User.js";

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
            return res.status(401).json({msg:`Token invalido`})
        }
    }else{
        return res.status(403).json({msg:`Você não está logado`})
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

async function checkAdmin(req,res,next){
    const secret = config.secret
    const token = req.headers['authorization'].split(' ')[1]
    try{
        const decoded = jsonwebtoken.verify(token,secret)
        if(decoded){
            const admin = await User.findOne({_id:decoded.id,role:'admin'})
            if(admin){
                next()
            }else{
                return res.status(401).json({msg:`Token invalido ou não é admin`})
            }
        }
    }catch(error){
        return res.status(403).json({msg:`Token invalido`})
    }
}

async function checkClient(req,res,next){
    const secret = config.secret
    const token = req.headers['authorization'].split(' ')[1]
    try{
        const decoded = jsonwebtoken.verify(token,secret)
        if(decoded){
            const client = await User.findOne({_id:decoded.id,role:'client'})
            if(client){
                next()
            }else{
                return res.status(401).json({msg:`Token invalido ou não é cliente`})
            }
        }
    }catch(error){
        return res.status(403).json({msg:`Token invalido`})
    }
}

export default {login,checkToken,decoded,checkAdmin,checkClient}