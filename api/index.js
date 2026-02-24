const exp=require("express")
const app=exp()
const PORT=5000
const mongoose=require('mongoose')
const UserRoute=require('./routes/user routes')
const authRoute=require('./routes/auth routes')
// const dotenv=require('dotenv');
// dotenv.config();

// mongoose.connect(process.env.MONGO).then(()=>{
//      console.log("database connected successfully")
// }).catch((error)=>{
//     console.log(error)
// })
  
app.use(exp.json())

mongoose.connect('mongodb://127.0.0.1:27017/real-estate').then(()=>{
     console.log("database connected successfully")
}).catch((error)=>{
    console.log(error)
})

app.use('/api/user',UserRoute)
app.use('/api/auth',authRoute)

app.use((err,req,res,next)=>{
    const statusCode=err.statusCode||500;
    const msg=err.message||"Internal server error";
    return res.status(statusCode).json({
        success:false,
        statusCode,
        msg
    });
})

app.listen(PORT,()=>{
    console.log(`server started at port ${PORT}`);
})