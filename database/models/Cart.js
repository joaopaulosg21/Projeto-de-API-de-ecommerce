import database from '../database.js'

const cartSchema = database.Schema({
    items:[{
        product_name:String,
        product_quantity:Number,
        product_id:database.Types.ObjectId,
        product_price:database.Types.Decimal128
    }],
    user_id:database.Types.ObjectId,
    status:{
        type:String,
        default:'pendente'
    }
})

const Cart = database.model('cart',cartSchema)

export default Cart