const  exp = require("express");
const mongoose =  require("mongoose");
const { ProductModel } = require("../model/productsModel");
const homeRouter = exp.Router();

homeRouter.get("/getProduct",async(req,res)=>{
    try {
        const data = await ProductModel.find();
        res.send(data)
    } catch (error) {
        res.send("Something Went Wrong on homepage!!");
        console.log(error);
    }
})


module.exports ={
    homeRouter
}