const exp=require("express")
const app=exp()
const PORT=5000

app.listen(PORT,()=>{
    console.log(`server started at port ${PORT}`);
})