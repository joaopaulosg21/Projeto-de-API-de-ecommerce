import database from '../database.js';

const productsSchema = database.Schema({
    name:String,
    price:database.Types.Decimal128,
    quantity:Number,
    description:String
})

const Product = database.model('Products',productsSchema)

export default Product