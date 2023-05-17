const bcrypt=require("bcrypt");
const User=require('../models/user')
const jwt=require("jsonwebtoken");
require("dotenv").config();


const signup=async (req,res)=>{
    try {
        const {name,email,password,cpassword}=req.body;
        
        const existingEmail=await User.findOne({email})
        
    if(existingEmail){
        return res.status(400).json({msg:"An account with this is already exists"});
    }

    if(!name || !email || !password || !cpassword ){
        return res.status(400).json({msg:"Not all fields have been entered"});
    }

    if(password.length<5){
        return res.status(400).json({msg:"The password length needs to be atleast 5 characters long."})
    }

    if(password!==cpassword){
        return res.status(400).json({msg:"Passwords do not match , please check it"});
    }

    // const salt=await bcrypt.genSalt(10);
    const passwordhash=await bcrypt.hash(password,10);

    const newUser=await User.create({
        name:name,
        email:email,
        password:passwordhash,
        coverphoto:"",
        image:"",
        subscribers:[],
        subscriptions:[],
        playlists:[],
        videos:[],
        history:[],
        notifications:[]
    })

    // const savedUser=await newUser.save();
    res.json(newUser);
    } catch (error) {
        return res.status(500).json({err: error.message})
    }
}

const login=async(req,res)=>{
    try {
        const {email,password}=req.body
        
        if(!email || !password){
            return res.status(400).json({msg:"all fields are required"});
        }

        const user=await User.findOne({email:email});
        if(!user){
            return res.status(400).json({msg:"No account with this email is registered"});
        }
        // const salt=await bcrypt.genSalt(10);
        // const hashpassword=await bcrypt.hash(req.body.password,salt);
        // console.log(hashpassword);
        // console.log(user.password);
        // const p=await bcrypt.compare(password,user.password);
        // console.log(p);
        console.log(user.name)
        console.log(user.email);
        console.log(user.password);
        const isMatch=await bcrypt.compare(password,user.password);        
        if(!isMatch){
            return res.status(400).json({msg:"Invalid Creditionals"+password+user.password+isMatch});
        }

        // creating our json web token by passing the user id and our JWT_SECRET
        const token=jwt.sign({id:user._id},process.env.ACCESS_TOKEN_SECRET);
        res.json({token,
            user:{
                id:user._id,
                email:user.email,
                password:user.password,
        },
    })
    } catch (error) {
        res.status(500).json({err:error.message});
    }
}

module.exports={signup,login}