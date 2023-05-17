const express=require("express");
const app=express();
const http=require("http").createServer(app);
const port= process.env.PORT || 3000;
require('./database/conn');
const userAuth=require("./routes/userAuthroutes");
const bodyparser=require("body-parser");

app.use(bodyparser.json())


http.listen(port,()=>{
    console.log(`Server is started on ${port}`);
})

app.get("/",(req,res,next)=>{
    res.send(200).json({msg:"hello"});
    next();
})

app.use(userAuth)
// app.use("/login",userAuth)