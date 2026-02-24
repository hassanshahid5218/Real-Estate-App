const User=require('../models/user model')
const bcryptjs=require('bcryptjs')
async function signup(req,res) {
    const {username,email,password}=req.body;
    const hasspassword=bcryptjs.hashSync(password,10)
    const newUser= new User({username,email,password:hasspassword});
    await newUser.save();
    res.status(201).json("User create successfully")
}

module.exports={
    signup
}