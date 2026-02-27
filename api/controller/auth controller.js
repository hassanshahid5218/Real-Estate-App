const User=require('../models/user model.js')
const bcryptjs=require('bcryptjs')
const errorhandler=require('../utills/errors');
const jwt=require('jsonwebtoken')
require("dotenv").config();

async function signup(req, res, next) {
  try {
    console.log("REQ BODY:", req.body);

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return next(errorhandler(400, "All fields are required"));
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(errorhandler(409, "User already exists"));
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User created successfully",
    });

  } catch (err) {
    console.error("SIGNUP ERROR:", err);
    next(err);
  }
}


async function signin(req,res,next){
   const{email,password}=req.body
   try{
       const validuser=await User.findOne({email});
       if(!validuser) return next(errorhandler(404,"User not found!"))
       const validpassword=bcryptjs.compareSync(password,validuser.password) 
       if(!validpassword) return next(errorhandler(404,"Invalid password"))
       const token= jwt.sign({id:validuser._id},process.env.JWT_SECRET)
       const {password:pass, ...rest}=validuser._doc
       res.cookie("access_token",token,{http:true}).
       status(200).
       json(rest)
   }
   catch(error){
    next(error)
   }
}

module.exports={
    signup,
    signin
}