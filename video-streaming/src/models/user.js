const mongoose=require("mongoose");

const userSchema= new mongoose.Schema({
    name:{type:String,require:true},
    email:{type:String,require:true,unique:true},
    password:{type:String,lowercase:true,require:true,minlength:5},
    coverphoto:{type:String},
    image:{type:String},
    subscribers:[{type:String}],
    subscriptions:[{type:String}],
    playlists:[{type:String}],
    videos:[{type:String}],
    history:[{type:String}],
    notifications:[{type:String}],
})

const User=new mongoose.model("User",userSchema);

module.exports=User;

