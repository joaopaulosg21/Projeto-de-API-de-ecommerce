import database from "../database.js"

const userSchema = database.Schema({
    name:String,
    username:String,
    password:String,
    token:String,
    address:[{city:String,state:String,country:String}],
    role:{
        type:String,
        default:'cliente'
    }
})

const User = database.model('Users',userSchema)

export default User