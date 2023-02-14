const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    img:String,
    Title:String,
    price:String,
    Delivery:String,
    Rating:String,
    product_id:Number,
    reviews:String,
    More:String,
    userID:String
})

const ProductModel = mongoose.model("product",productSchema)

module.exports={
    ProductModel
}