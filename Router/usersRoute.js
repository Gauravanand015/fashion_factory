const exp = require("express");
const jwt = require("jsonwebtoken");
const bcrypt=require("bcrypt")
const { UserModel } = require("../model/uersModel");
const userRouter = exp.Router()
require("dotenv").config();

userRouter.post("/register",async(req,res)=>{
    const {name,email,pass,age} = req.body;
    const mail = await UserModel.find({email});
    console.log(mail)
    if(mail.length>0){
        return res.send("This email is already registered try another email!!")
    }
    try {
        bcrypt.hash(pass, 7, async (err, encrypt) =>{
            if(err){
                res.send("Enter Valid Details!!")
                console.log(err);
            }else{
                const userData =  new UserModel({name,email,pass:encrypt,age});
                await userData.save();
                res.send("New User Has been Registered!!")
            }
        })
    } catch (error) {
        res.send("Somthing Went Wrong while registering")
        console.log(error)
    }
})

userRouter.post("/login_user", async(req,res)=>{
    const {email,pass} = req.body;
    try {
        const find = await UserModel.find({email:email})
        console.log(find)
        if(find.length>0){
            bcrypt.compare(pass, find[0].pass, (err, result)=>{
                if(err){
                    res.send({msg:"email or password is not correct please try again"})
                    console.log(err)
                }else{
                    let token = jwt.sign({ userID: find[0]._id }, process.env.userSecretKey);
                    res.send({"msg":"Login Successfully","token":token})
                }
            });
        }
    } catch (error) {
        res.send("Somthing Went Wrong while login !!")
        console.log(error)
    }
})

module.exports={
    userRouter
}