const  exp = require("express");
const { CartModel } = require("../model/cartModel");
const { ProductModel } = require("../model/productsModel");
const productRouter = exp.Router()
const cloud = require("cloudinary").v2
require("dotenv").config();

cloud.config({
    cloud_name: 'dcqylnqry',
    api_key: '796765436163833',
    api_secret: process.env.apiSecretKey,
    secure: true
});

productRouter.get("/allData",async(req,res)=>{
    try {
        const allData = await ProductModel.find()
        res.send(allData);
    } catch (error) {
        res.send(error)
        console.log(error);
    }
})


productRouter.post("/create",async(req,res)=>{

    const file = req.files.img;
    const allData = await ProductModel.find()
    // res.send(`${allData.length}`)
    cloud.uploader.upload(file.tempFilePath, async (err, result) => {
        try {
            if(allData.length>=0){
                const data = new ProductModel({
                    img : result.url,
                    Title:req.body.title,
                    price:req.body.price,
                    Delivery:req.body.delivery,
                    Rating:req.body.rating,
                    reviews:req.body.reviews,
                    More:req.body.more,
                    product_id:+(allData.length+2)
            })
                await data.save()
                console.log(data)
                res.send("Created data");
            }else{
                console.log(err);
                res.send("Something Is Wrong !!")
            }
        } catch (error) {
            res.send("Something is Wrong !!")
            console.log(error)
        }
    })
})


productRouter.patch("/editnupdate/:product_id",async (req,res)=>{
    const id = req.params.product_id;
    const data = req.body
    try {
        const update =  await ProductModel.updateOne({product_id:id},data)
        res.send("Updated")
        console.log(update);
    } catch (error) {
        res.send(error);
    }
})

productRouter.delete("/delete/:product_id",async (req,res)=>{
    const id = req.params.product_id;
    try {
        const del =  await ProductModel.deleteOne({product_id:id})
        await CartModel.deleteOne({product_id:id})
        res.send("Deleted")
        console.log(del);
    } catch (error) {
        res.send(error);
        console.log(error);
    }
})

module.exports={
    productRouter
}







// console.log(arr);