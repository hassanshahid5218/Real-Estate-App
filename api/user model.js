const mongoose=require('mongoose')
const { timeStamp } = require('node:console')
const userSchema=new mongoose.Schema(
    {
        username:{
            type:"String",
            required:"true",
            unique:"true"
        },
        email:{
            type:"string",
            required:"true",
            unique:"true"
        },
        password:{
            type:"string",
            required:"true",
            unique:"true"
        }
    },{timestamps:true}
)

const User=mongoose.model('User',userSchema)

module.exports=User