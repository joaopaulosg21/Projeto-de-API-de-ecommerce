import database from "../database.js"

const userSchema = database.Schema({
    name:String,
    username:String,
    password:String,
    tokens:[{token:String}],
    address:[{city:String,state:String,country:String}]
})

const User = mongoose.model('Users',userSchema)

export default User