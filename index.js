const  exp = require("express");
const { connection } = require("./config/db");
require("dotenv").config()
const fileUpload = require("express-fileupload");
const { productRouter } = require("./Router/productRoute");
const { adminRouter } = require("./Router/adminRoute");
const { validateAdmin } = require("./middleware/adminAuthenticate");
const { userRouter } = require("./Router/usersRoute");
const { cartRouter } = require("./Router/cartRouter");
const cors = require("cors");
const { homeRouter } = require("./Router/homepage");

const app = exp();

app.use(cors())

app.use(exp.json());

app.use(fileUpload({
    useTempFiles:true
}))

app.use("/home",homeRouter)


app.use("/users",userRouter)
app.use("/cart",cartRouter)


app.use("/admin",adminRouter)
app.use(validateAdmin)
app.use("/product",productRouter)



app.listen(process.env.Port,async ()=>{
    try {
        await connection
        console.log("Connected to DataBase")
    } catch (error) {
        console.log(error)
    }
    console.log("Connedted to server");
})