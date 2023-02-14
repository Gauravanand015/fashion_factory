const exp = require("express");
const jwt = require("jsonwebtoken");
const { ProductModel } = require("../model/productsModel");
const { CartModel } = require("../model/cartModel");
const cartRouter = exp.Router()
require("dotenv").config();

cartRouter.get("/getCartData",async(req,res)=>{
    const token = req.headers.authorization
    console.log(token)
    const decoded = jwt.verify(token, process.env.userSecretKey);
    // res.send(decoded)
    try {
        if(decoded){
            const cartData = await CartModel.find({userID:decoded.userID})
            res.send([cartData,"getting all Data of specific user"])
        }else{
            res.send("Something Went Wrong!!")
        }
    } catch (error) {
        res.send("Something Went Wrong!!")
    }
})

cartRouter.post("/itemPostatCart/:product_id",async(req,res)=>{
    const pro_id = req.params.product_id;
    const product_data = await ProductModel.find({product_id:pro_id})
    const token = req.headers.authorization
    const decoded = jwt.verify(token, process.env.userSecretKey);
    product_data[0].userID = decoded.userID
    try {
        if(product_data[0].product_id==pro_id){
            console.log(product_data)
            const addToCart = await CartModel.insertMany(product_data[0])
            console.log(addToCart)
            res.send("Add to the Cart")
        }else{
            res.send("Product is not available")
        }
    } catch (error) {
        res.send("Something Went Wrong!!")
        console.log(error)
    }
})

cartRouter.delete("/deleteItemfromCart/:product_id",async (req,res)=>{
    const pro_id = req.params.product_id;
    const product_data = await CartModel.find({product_id:pro_id})
    const cart_pro_userID = product_data[0].userID
    const token = req.headers.authorization
    const decoded = jwt.verify(token, process.env.userSecretKey);
    const users_userId = decoded.userID
    console.log(users_userId,cart_pro_userID)
    try {
        if(users_userId==cart_pro_userID){
            // console.log(product_data)
            const deleteFromCart = await CartModel.deleteOne({product_id:pro_id})
            console.log(deleteFromCart)
            res.send("item is deleted from the Cart")
        }else{
            res.send("wrong input")
        }
    } catch (error) {
        res.send("Something Went Wrong!!")
        console.log(error)
    }
})
module.exports={
    cartRouter
}