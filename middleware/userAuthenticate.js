// const jwt = require("jsonwebtoken");
// require("dotenv").config();


// const validateUser = (req,res,next)=>{
//     const token = req.headers.authorization;
//     try {
//         var decoded = jwt.verify(token, process.env.userSecretKey);
//         console.log(decoded)
//         if(decoded){
//             const userId = decoded.UserID
//             req.body.userID = userId
//             next();
//         }else{
//             res.send("You Are Not Authorised !!")
//         }
//     } catch (error) {
//         res.send("Something Went Wrong !!")
//     }
// }

// module.exports = {
//     validateUser
// }