const User=require('../models/user model')
const bcryptjs=require('bcryptjs')
const {errorhandler}=require('../utills/errors')


async function signup(req,res,next) {
    const {username,email,password}=req.body;
    const hasspassword=bcryptjs.hashSync(password,10)
    const newUser= new User({username,email,password:hasspassword});
    try{
    await newUser.save();
    res.status(201).json("User create successfully")}
    catch(err){
        next(errorhandler(550,"Error From function"));
    }
}

module.exports={
    signup
}