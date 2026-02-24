const exp=require("express")
const app=exp()
const PORT=5000
const mongoose=require('mongoose')
// const dotenv=require('dotenv');
// dotenv.config();

// mongoose.connect(process.env.MONGO).then(()=>{
//      console.log("database connected successfully")
// }).catch((error)=>{
//     console.log(error)
// })

mongoose.connect('mongodb://127.0.0.1:27017/real-estate').then(()=>{
     console.log("database connected successfully")
}).catch((error)=>{
    console.log(error)
})

app.listen(PORT,()=>{
    console.log(`server started at port ${PORT}`);
})