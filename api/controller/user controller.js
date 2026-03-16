const User = require("../models/user model.js")
const errorhandler = require("../utills/errors.js")
const bcrypt=require('bcryptjs')
async function test(req,res){
   res.json({
    message:"Hello world"
   })
}

async function updateuserinfo( req,res,next){
  if(req.user.id!==req.params.id) return next(errorhandler(401,"Only update your own account"))
    try{
   if(req.body.password){
    req.body.password=bcrypt.hashSync(req.body.password,10)
   }
   const updatedUser=await User.findByIdAndUpdate(req.params.id,{
    $set:{
        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
        avatar:req.body.avatar
    }
    },{new:true}
   )
   const {password,...rest}=updatedUser._doc;
   res.status(200).json(rest)
}
catch(error){
    next(error)
}
}

module.exports={
    test,updateuserinfo
}