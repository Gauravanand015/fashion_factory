const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
    name:String,
    email:String,
    pass:String,
    age:String
})

const AdminModel = mongoose.model("adminData",adminSchema)

module.exports={
    AdminModel
}