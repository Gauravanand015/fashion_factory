const mongoose = require("mongoose");

const cartSchema =  mongoose.Schema({
    img:String,
    Title:String,
    price:String,
    product_id:Number,
    userID:String
})

const CartModel = mongoose.model("cartitem",cartSchema)

module.exports={
    CartModel
}