const mongoose=require("mongoose");

const uri="mongodb+srv://jayeshmalviya07:3mrLhT5HMU39eri9@cluster0.swn5gfp.mongodb.net/video_streaming?retryWrites=true&w=majority";

try{
        mongoose
        .connect(uri,{useNewUrlParser:true,useUnifiedTopology:true})
        .then(()=>{
            console.log("database is successfully connected");
        })
        .catch((err)=>{
            console.log("database is not connected",err.message);
        })
}
catch(err){
        console.log(err.message);
    }

