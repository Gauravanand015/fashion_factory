const exp = require("express");
const adminRouter = exp.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { AdminModel } = require("../model/adminModel");
require("dotenv").config();


adminRouter.post("/register",async(req,res)=>{
    const {name,email,pass,age} = req.body;
    const mail = await AdminModel.find({email});
    console.log(mail)
    if(mail.length>0){
        return res.send("This email is already registered try another email!!")
    }
    try {
        bcrypt.hash(pass, 7, async (err, encrypt) =>{
            if(err){
                console.log(err);
                res.send("Enter correct credendials")
            }else{
                const regiserAdmin = new AdminModel({name,email,pass:encrypt,age})
                await regiserAdmin.save()
                res.send("New Admin has been registered!!")
            }
        });
    } catch (error) {
        res.send("Something Went Wrong!!")
        console.log(err);
    }
})

adminRouter.post("/login",async(req,res)=>{
    const {email,pass} = req.body;
    try {
        const find = await AdminModel.find({email:email})
        console.log(find)
        if(find[0].email){
            bcrypt.compare(pass, find[0].pass, (err, result)=>{
                if(err){
                    res.send("email or password is not correct please try again")
                    console.log(err)
                }else{
                    let token = jwt.sign({ pass: find[0].pass }, process.env.adminSecretKey);
                    res.send({"msg":"Login Successfully","token":token})
                }
            });
        }
    } catch (error) {
        res.send("Somthing Went Wrong !!")
        console.log(error);
    
    }
})

module.exports={
    adminRouter
}