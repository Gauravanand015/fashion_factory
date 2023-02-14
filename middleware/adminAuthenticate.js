const jwt = require("jsonwebtoken");
require("dotenv").config();

const validateAdmin =  (req,res,next)=>{
    const token = req.headers.authorization;
    try {
        var decoded = jwt.verify(token, process.env.adminSecretKey);
        console.log(decoded)
        if(decoded){
            next();
        }else{
            res.send("You Are Not Authorised !!")
        }
    } catch (error) {
        res.send("Something Went Wrong in middleware !!")
        console.log(error)
    }
}

module.exports = {
    validateAdmin
}